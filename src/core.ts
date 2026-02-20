// For more information, see https://crawlee.dev/
import { Configuration, PlaywrightCrawler, downloadListOfUrls } from "crawlee";
import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import { Config, configSchema } from "./config.js";
import { Page } from "playwright";
import { isWithinTokenLimit } from "gpt-tokenizer";
import { PathLike } from "fs";
import { predictSelector } from "./ai_selector.js";
import TurndownService from "turndown";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

let pageCounter = 0;
let crawler: PlaywrightCrawler;

// Cache for predicted selectors to avoid repeated LLM calls per domain/run
let predictedSelector: string | null = null;

// Proxy rotation state
let proxyIndex = 0;
function getNextProxy(proxyUrls?: string[]): string | undefined {
  if (!proxyUrls || proxyUrls.length === 0) return undefined;
  const proxy = proxyUrls[proxyIndex];
  proxyIndex = (proxyIndex + 1) % proxyUrls.length;
  return proxy;
}

// Helper to generate filename from URL
function generateFilename(url: string, outputFormat: string = 'markdown'): string {
  try {
    const urlObj = new URL(url);
    // Extract domain without TLD (e.g., "docs.telethon.dev" -> "telethon")
    const hostname = urlObj.hostname;
    const parts = hostname.split('.');
    // Try to get meaningful part (skip www, docs, etc.)
    const domain = parts.find(p => !['www', 'docs', 'api', 'blog'].includes(p)) || parts[0];
    
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const extension = outputFormat === 'markdown' ? 'md' : 'json';
    
    return `./data/${domain}-${date}.${extension}`;
  } catch (e) {
    // Fallback if URL parsing fails
    const date = new Date().toISOString().split('T')[0];
    const extension = outputFormat === 'markdown' ? 'md' : 'json';
    return `./data/output-${date}.${extension}`;
  }
}

// Initialize markdown converter
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Add custom rules to clean up common issues
turndownService.addRule('cleanAnchors', {
  filter: function (node) {
    return node.nodeName === 'A' && !node.textContent.trim();
  },
  replacement: function () {
    return '';
  }
});

turndownService.addRule('removeJunk', {
  filter: function (node: any) {
    const className = (node.className || '').toLowerCase();
    const id = (node.id || '').toLowerCase();
    const combined = className + ' ' + id;
    
    // Remove ads, tracking, social media, navigation, consent banners
    return (
      combined.includes('nav') || combined.includes('sidebar') || 
      combined.includes('footer') || combined.includes('header') ||
      combined.includes('breadcrumb') || combined.includes('toctree') ||
      combined.includes('social') || combined.includes('share') ||
      combined.includes('follow') || combined.includes('comment') ||
      combined.includes('related') || combined.includes('advertisement') ||
      combined.includes('ad-') || combined.includes('adocean') ||
      combined.includes('rubicon') || combined.includes('tracking') ||
      combined.includes('promo') || combined.includes('widget') ||
      combined.includes('banner') || combined.includes('popup') ||
      combined.includes('cookie') || combined.includes('newsletter') ||
      combined.includes('consent') || combined.includes('gdpr') ||
      combined.includes('privacy') || combined.includes('cmp') ||
      combined.includes('toolbar') || combined.includes('topbar') ||
      combined.includes('menu') || combined.includes('toc') ||
      combined.includes('table-of-contents') || combined.includes('sphinxsidebar')
    );
  },
  replacement: function () {
    return '';
  }
});

turndownService.addRule('removeScripts', {
  filter: ['script', 'style', 'noscript', 'iframe'],
  replacement: function () {
    return '';
  }
});

// Remove SVG elements (icons, decorative graphics)
turndownService.addRule('removeSvg', {
  filter: function (node) {
    return node.nodeName === 'svg' || node.nodeName === 'SVG';
  },
  replacement: function () {
    return '';
  }
});

// Remove tracking pixels and non-content images
turndownService.addRule('removeTrackingImages', {
  filter: function (node) {
    if (node.nodeName === 'IMG') {
      const src = (node.getAttribute('src') || '').toLowerCase();
      const alt = (node.getAttribute('alt') || '').toLowerCase();
      const width = parseInt(node.getAttribute('width') || '999', 10);
      const height = parseInt(node.getAttribute('height') || '999', 10);
      // Remove 1x1 tracking pixels
      if (width <= 2 && height <= 2) return true;
      // Remove known tracking/analytics pixel URLs
      if (src.includes('pixel') || src.includes('beacon') || src.includes('tracker') ||
          src.includes('analytics') || src.includes('gemius') || src.includes('doubleclick') ||
          src.includes('facebook.com/tr') || src.includes('google-analytics') ||
          src.includes('rubiconproject') || src.includes('adocean')) return true;
      // Remove logos and social icons
      if (src.includes('logo') || src.includes('social') || 
           alt.includes('logo') || alt.includes('követem') || 
           alt.includes('facebook') || alt.includes('twitter')) return true;
    }
    return false;
  },
  replacement: function () {
    return '';
  }
});

export function getPageHtml(page: Page, selector = "body") {
  return page.evaluate((selector) => {
    // Helper to get HTML from an element
    const getHTML = (el: Element | null) => (el as HTMLElement)?.innerHTML || "";
    // Helper to get text from an element
    const getText = (el: Element | null) => (el as HTMLElement)?.innerText || "";

    // If a specific selector is provided and valid, use it
    if (selector && selector !== "body") {
      if (selector.startsWith("/")) {
        const elements = document.evaluate(
          selector,
          document,
          null,
          XPathResult.ANY_TYPE,
          null,
        );
        let result = elements.iterateNext();
        return result ? result.textContent || "" : "";
      } else {
        const el = document.querySelector(selector);
        return getHTML(el);
      }
    }

    // Advanced Auto-detection: Score elements to find the best content candidate
    const scoreElement = (el: HTMLElement) => {
      let score = 0;
      const text = el.innerText || "";
      const len = text.length;
      
      // Ignore elements with too little text
      if (len < 100) return 0;

      // Base score from logarithmic length (longer text is better, but diminishing returns)
      score += Math.log(len) * 10;

      const tagName = el.tagName.toLowerCase();
      if (tagName === 'article') score += 20;
      if (tagName === 'main') score += 20;
      if (tagName === 'div' || tagName === 'section') score += 5;

      const className = (el.className || "").toLowerCase();
      const id = (el.id || "").toLowerCase();
      const combined = className + " " + id;

      // Positive signals
      if (combined.includes('article') || combined.includes('content') || combined.includes('post') || combined.includes('body') || combined.includes('main')) {
        score += 15;
      }
      
      // Negative signals (boilerplate)
      if (combined.includes('nav') || combined.includes('sidebar') || combined.includes('footer') || combined.includes('header') || combined.includes('menu') || combined.includes('copyright') || combined.includes('cookie') || combined.includes('consent') || combined.includes('gdpr') || combined.includes('toc') || combined.includes('breadcrumb')) {
        score -= 25;
      }

      // Penalize link-heavy elements (navigation, TOC, link lists)
      const links = el.querySelectorAll('a');
      const linkText = Array.from(links).reduce((sum, a) => sum + (a.textContent?.length || 0), 0);
      const linkDensity = len > 0 ? linkText / len : 0;
      if (linkDensity > 0.5) score -= 30;
      
      return score;
    };

    // Candidate selection: Look at semantic tags and common containers
    const candidates = document.querySelectorAll('article, main, div, section, .content, #content, .post, #post');
    let bestEl: HTMLElement = document.body;
    let bestScore = 0;

    candidates.forEach((el) => {
       const htmlEl = el as HTMLElement;
       // Skip invisible elements
       if (htmlEl.offsetParent === null) return;
       
       const s = scoreElement(htmlEl);
       if (s > bestScore) {
         bestScore = s;
         bestEl = htmlEl;
       }
    });

    return bestEl.innerHTML || document.body.innerHTML || "";
  }, selector);
}

export async function waitForXPath(page: Page, xpath: string, timeout: number) {
  await page.waitForFunction(
    (xpath) => {
      const elements = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ANY_TYPE,
        null,
      );
      return elements.iterateNext() !== null;
    },
    xpath,
    { timeout },
  );
}

async function processContent(html: string, config: Config) {
  const outputFormat = config.outputFormat || 'json';
  
  if (outputFormat === 'json') {
    // Legacy behavior: return plain text
    const tempDiv = turndownService.turndown(html);
    return tempDiv.replace(/\[.*?\]\(.*?\)/g, '').replace(/[#*`]/g, ''); // Strip markdown syntax for plain text
  }
  
  // Convert HTML to markdown
  let markdown = turndownService.turndown(html);
  
  // Post-process to clean up common issues and optimize for vectorization
  markdown = markdown
    // Remove empty links
    .replace(/\[]\(.*?\)/g, '')
    // Remove duplicate anchor patterns like [text](#id)[](#id "title")
    .replace(/(\[.*?\]\(#.*?\))\[]\(#.*?\)/g, '$1')
    // Remove "View page source" links and similar
    .replace(/\[View page source\]\(.*?\)/gi, '')
    // Remove social media follow text
    .replace(/Követ(em|ese).*?(Facebook|Twitter|Instagram).*?!?/gi, '')
    // Remove ad-related function calls
    .replace(/adocean\w+\(\)/g, '')
    .replace(/window\._adoGlobal.*?\);/g, '')
    // Remove video player noise
    .replace(/Press shift question mark to access.*?keyboard shortcuts/gi, '')
    .replace(/Play\/Pause.*?Live/gi, '')
    .replace(/\d+ seconds of \d+ seconds/gi, '')
    .replace(/Volume \d+%/gi, '')
    // Remove tracking/analytics URLs
    .replace(/https?:\/\/.*?(hit\.gemius|rubiconproject|doubleclick|google-analytics|indexstat|pixel\.php|beacon|facebook\.com\/tr).*?(\s|$)/g, '')
    // Remove tracking pixel image references
    .replace(/!\[pixel\]\(.*?\)/gi, '')
    .replace(/!\[]\(.*?(pixel|beacon|tracker|analytics).*?\)/gi, '')
    // Remove all remaining image references (images don't vectorize)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove cookie consent / GDPR blocks (multi-line: paragraph starting with consent keywords)
    .replace(/^.*?(Az Ön adatainak védelme|cookie-?kat? használ|sütiket.*?használ|adatkezelés|hozzájárulás).*$(\n.*$){0,15}/gmi, '')
    .replace(/^.*?(We use cookies|Cookie Policy|Privacy Policy|Adatvédelmi|consent to|accept cookies).*$(\n.*$){0,10}/gmi, '')
    // Remove "Last modified" boilerplate
    .replace(/^Last modified:.*$/gm, '')
    // Remove navigation-only lines: lines that are just a markdown link with no surrounding prose
    .replace(/^-\s*\[.*?\]\(https?:\/\/.*?\)\s*$/gm, '')
    // Remove lines that are only an internal anchor link (TOC entries)
    .replace(/^-\s*\[.*?\]\(#.*?\)\s*$/gm, '')
    // Remove standalone link lines (no list marker)
    .replace(/^\[.*?\]\(https?:\/\/(?!.*\s).*?\)\s*$/gm, '')
    // Remove "Contents" / "Table of Contents" headings left behind
    .replace(/^#{1,6}\s*(Contents|Table of Contents)\s*$/gim, '')
    // Remove lines with only javascript-like content
    .replace(/^.*?(function\(|var |window\.|document\.).*?$/gm, '')
    // Remove orphaned list items with just dashes or bullets
    .replace(/^\s*[-*]\s*$/gm, '')
    // Remove orphaned horizontal rules between cleaned sections
    .replace(/(\n\s*\* \* \*\s*\n){2,}/g, '\n\n* * *\n\n')
    // Remove standalone separator lines that are now orphaned
    .replace(/^\s*[-*_]{3,}\s*$/gm, '---')
    // Remove consecutive separators
    .replace(/(---\n){2,}/g, '---\n')
    // Clean up multiple consecutive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // If chunking is enabled, split the content
  if (config.enableChunking) {
    const chunkSize = config.chunkSize || 1000;
    const chunkOverlap = config.chunkOverlap || 200;
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      separators: ["\n\n", "\n", " ", ""],
    });
    
    const chunks = await splitter.createDocuments([markdown]);
    return {
      markdown,
      chunks: chunks.map((chunk, idx) => ({
        index: idx,
        content: chunk.pageContent,
        metadata: chunk.metadata,
      })),
    };
  }
  
  return markdown;
}

export async function crawl(config: Config) {
  configSchema.parse(config);
  
  // Apply defaults if not provided
  if (!config.outputFormat) config.outputFormat = 'markdown';
  if (config.enableChunking === undefined) config.enableChunking = true;
  if (!config.chunkSize) config.chunkSize = 1000;
  if (!config.chunkOverlap) config.chunkOverlap = 200;
  if (!config.outputFileName) {
    config.outputFileName = generateFilename(config.url, config.outputFormat);
  }
  
  // Log proxy configuration
  if (config.proxyUrls && config.proxyUrls.length > 0) {
    console.log(`🔄 Proxy rotation enabled with ${config.proxyUrls.length} proxies:`);
    config.proxyUrls.forEach((proxy, idx) => {
      // Mask password in log
      const maskedProxy = proxy.replace(/:([^:@]+)@/, ':***@');
      console.log(`  ${idx + 1}. ${maskedProxy}`);
    });
  }
  
  // Reset cache for new crawl run
  predictedSelector = null;

  if (process.env.NO_CRAWL !== "true") {
    // PlaywrightCrawler crawls the web using a headless
    // browser controlled by the Playwright library.
    
    // Select a random proxy if available and parse it
    let proxyConfig: { server: string; username?: string; password?: string } | undefined;
    let proxyArgs: string[] = [];
    
    if (config.proxyUrls && config.proxyUrls.length > 0) {
      const selectedProxy = config.proxyUrls[Math.floor(Math.random() * config.proxyUrls.length)];
      
      // Parse proxy URL - supports http, https, socks5
      // Pattern: protocol://[user:pass@]host:port
      const proxyMatch = selectedProxy.match(/^(https?|socks5):\/\/(?:([^:]+):([^@]+)@)?(.+)$/);
      if (proxyMatch) {
        const [, protocol, username, password, server] = proxyMatch;
        
        // For SOCKS5 with auth, use Chrome launch args ONLY (not proxyConfig)
        // Chromium cannot handle SOCKS5 auth via Playwright's proxy config
        if (protocol === 'socks5' && username && password) {
          console.log(`🔧 Using Chrome launch args for SOCKS5 with authentication`);
          // Note: Chrome launch args don't support auth in proxy-server flag
          // We'll use HTTP CONNECT method instead
          proxyArgs = [
            `--proxy-server=${protocol}://${server}`,
          ];
          // Store credentials for potential use
          proxyConfig = {
            server: `${protocol}://${server}`,
            username,
            password
          };
        } else if (protocol === 'socks5') {
          // SOCKS5 without auth - use launch args
          console.log(`🔧 Using Chrome launch args for SOCKS5 (no auth)`);
          proxyArgs = [`--proxy-server=${protocol}://${server}`];
        } else {
          // HTTP/HTTPS - use standard Playwright proxy config
          proxyConfig = {
            server: `${protocol}://${server}`,
            ...(username && password ? { username, password } : {})
          };
        }
        
        const maskedProxy = selectedProxy.replace(/:([^:@]+)@/, ':***@');
        console.log(`🌐 Selected proxy for this crawl session: ${maskedProxy}`);
        if (proxyConfig) {
          console.log(`   Playwright config: ${proxyConfig.server}, Auth: ${proxyConfig.username ? 'Yes' : 'No'}`);
        }
        if (proxyArgs.length > 0) {
          console.log(`   Chrome args: ${proxyArgs.join(' ')}`);
        }
      } else {
        console.warn(`⚠️  Invalid proxy URL format: ${selectedProxy}`);
      }
    }
    
    crawler = new PlaywrightCrawler(
      {
        // Use the requestHandler to process each of the crawled pages.
        async requestHandler({ request, page, enqueueLinks, log, pushData }) {
          const title = await page.title();
          pageCounter++;
          log.info(
            `Crawling: Page ${pageCounter} / ${config.maxPagesToCrawl} - URL: ${request.loadedUrl}...`,
          );

          // Auto-detect selector using Hybrid approach (Scoring + AI) if not provided
          if (!config.selector && !predictedSelector) {
             try {
                 log.info("No selector provided. Running hybrid selector detection (Scoring + AI)...");
                 
                 // Use the new hybrid approach: scoring + AI
                 predictedSelector = await predictSelector(page, request.loadedUrl || "");
                 config.selector = predictedSelector;
                 log.info(`Selected: ${config.selector}`);
             } catch (e) {
                 log.warning(`GenAI selector prediction failed: ${e}. Falling back to auto-detection.`);
             }
          } else if (predictedSelector && !config.selector) {
              // Reuse predicted selector for subsequent pages if config.selector was empty
              config.selector = predictedSelector;
          }

          // Use custom handling for XPath selector
          if (config.selector) {
            if (config.selector.startsWith("/")) {
              await waitForXPath(
                page,
                config.selector,
                config.waitForSelectorTimeout ?? 1000,
              );
            } else {
              await page.waitForSelector(config.selector, {
                timeout: config.waitForSelectorTimeout ?? 1000,
              });
            }
          }

          const html = await getPageHtml(page, config.selector);
          const content = await processContent(html, config);

          // Save results as JSON to ./storage/datasets/default
          await pushData({ 
            title, 
            url: request.loadedUrl, 
            ...(typeof content === 'string' ? { content } : content)
          });

          if (config.onVisitPage) {
            await config.onVisitPage({ page, pushData });
          }

          // Extract links from the current page
          // and add them to the crawling queue.
          await enqueueLinks({
            globs:
              typeof config.match === "string" ? [config.match] : config.match,
            exclude:
              typeof config.exclude === "string"
                ? [config.exclude]
                : config.exclude ?? [],
          });
        },
        // Comment this option to scrape the full website.
        maxRequestsPerCrawl: config.maxPagesToCrawl,
        // Rate limiting to prevent 429 errors
        maxConcurrency: config.maxConcurrency || 1,
        maxRequestRetries: config.maxRequestRetries || 3,
        requestHandlerTimeoutSecs: 60,
        // Proxy configuration
        // For SOCKS5 with auth: use args only (don't set proxy config - causes conflicts)
        // For HTTP/HTTPS: use proxy config (supports auth natively)
        ...((proxyConfig && proxyArgs.length === 0) || proxyArgs.length > 0 ? {
          launchContext: {
            launchOptions: {
              // Only include proxy config for HTTP/HTTPS (not SOCKS5 with auth)
              ...(proxyConfig && proxyArgs.length === 0 ? { proxy: proxyConfig } : {}),
              // Include args for SOCKS5
              ...(proxyArgs.length > 0 ? { args: proxyArgs } : {}),
            },
          },
        } : {}),
        // Uncomment this option to see the browser window.
        // headless: false,
        preNavigationHooks: [
          // Abort requests for certain resource types
          async ({ request, page, log }) => {
            // If there are no resource exclusions, return
            const RESOURCE_EXCLUSTIONS = config.resourceExclusions ?? [];
            if (RESOURCE_EXCLUSTIONS.length === 0) {
              return;
            }
            if (config.cookie) {
              const cookies = (
                Array.isArray(config.cookie) ? config.cookie : [config.cookie]
              ).map((cookie) => {
                return {
                  name: cookie.name,
                  value: cookie.value,
                  url: request.loadedUrl,
                };
              });
              await page.context().addCookies(cookies);
            }
            await page.route(
              `**\/*.{${RESOURCE_EXCLUSTIONS.join()}}`,
              (route) => route.abort("aborted"),
            );
            log.info(
              `Aborting requests for as this is a resource excluded route`,
            );
          },
        ],
        postNavigationHooks: [
          // Add delay between requests to prevent rate limiting
          async ({ log }) => {
            const delay = config.requestDelay || 2000;
            if (delay > 0) {
              log.info(`Waiting ${delay}ms before next request to prevent rate limiting...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          },
        ],
      },
      new Configuration({
        purgeOnStart: true,
      }),
    );

    const isUrlASitemap = /sitemap.*\.xml$/.test(config.url);

    if (isUrlASitemap) {
      const listOfUrls = await downloadListOfUrls({ url: config.url });

      // Add the initial URL to the crawling queue.
      await crawler.addRequests(listOfUrls);

      // Run the crawler
      await crawler.run();
    } else {
      // Add first URL to the queue and start the crawl.
      await crawler.run([config.url]);
    }
  }
}

export async function write(config: Config) {
  let nextFileNameString: PathLike = "";
  const jsonFiles = await glob("storage/datasets/default/*.json", {
    absolute: true,
  });

  console.log(`Found ${jsonFiles.length} files to combine...`);

  let currentResults: Record<string, any>[] = [];
  let currentSize: number = 0;
  let fileCounter: number = 1;
  const maxBytes: number = config.maxFileSize
    ? config.maxFileSize * 1024 * 1024
    : Infinity;

  const getStringByteSize = (str: string): number =>
    Buffer.byteLength(str, "utf-8");

  const nextFileName = (): string => {
    const outputFormat = config.outputFormat || 'markdown';
    const baseFileName = (config.outputFileName || generateFilename(config.url, outputFormat)).replace(/\.(json|md)$/, "");
    const extension = outputFormat === 'markdown' ? 'md' : 'json';
    return `${baseFileName}-${fileCounter}.${extension}`;
  };

  const writeBatchToFile = async (): Promise<void> => {
    nextFileNameString = nextFileName();
    const outputFormat = config.outputFormat || 'json';
    
    let fileContent: string;
    if (outputFormat === 'markdown') {
      // Write as markdown file(s)
      fileContent = currentResults.map(item => {
        let md = `# ${item.title}\n\n`;
        md += `**URL:** ${item.url}\n\n`;
        md += `---\n\n`;
        md += item.markdown || item.content || '';
        md += `\n\n`;
        return md;
      }).join('\n---\n\n');
    } else {
      // Write as JSON (default)
      fileContent = JSON.stringify(currentResults, null, 2);
    }
    
    await writeFile(nextFileNameString, fileContent);
    console.log(
      `Wrote ${currentResults.length} items to ${nextFileNameString}`,
    );
    currentResults = [];
    currentSize = 0;
    fileCounter++;
  };

  let estimatedTokens: number = 0;

  const addContentOrSplit = async (
    data: Record<string, any>,
  ): Promise<void> => {
    const contentString: string = JSON.stringify(data);
    const tokenCount: number | false = isWithinTokenLimit(
      contentString,
      config.maxTokens || Infinity,
    );

    if (typeof tokenCount === "number") {
      if (estimatedTokens + tokenCount > config.maxTokens!) {
        // Only write the batch if it's not empty (something to write)
        if (currentResults.length > 0) {
          await writeBatchToFile();
        }
        // Since the addition of a single item exceeded the token limit, halve it.
        estimatedTokens = Math.floor(tokenCount / 2);
        currentResults.push(data);
      } else {
        currentResults.push(data);
        estimatedTokens += tokenCount;
      }
    }

    currentSize += getStringByteSize(contentString);
    if (currentSize > maxBytes) {
      await writeBatchToFile();
    }
  };

  // Iterate over each JSON file and process its contents.
  for (const file of jsonFiles) {
    const fileContent = await readFile(file, "utf-8");
    const data: Record<string, any> = JSON.parse(fileContent);
    await addContentOrSplit(data);
  }

  // Check if any remaining data needs to be written to a file.
  if (currentResults.length > 0) {
    await writeBatchToFile();
  }

  return nextFileNameString;
}

class GPTCrawlerCore {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async crawl() {
    await crawl(this.config);
  }

  async write(): Promise<PathLike> {
    // we need to wait for the file path as the path can change
    return new Promise((resolve, reject) => {
      write(this.config)
        .then((outputFilePath) => {
          resolve(outputFilePath);
        })
        .catch(reject);
    });
  }
}

export default GPTCrawlerCore;
