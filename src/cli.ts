#!/usr/bin/env node

import { program } from "commander";
import { Config } from "./config.js";
import { crawl, write } from "./core.js";
import { createRequire } from "node:module";
import { readFile } from "fs/promises";
import inquirer from "inquirer";

const require = createRequire(import.meta.url);
const { version, description } = require("../../package.json");

const messages = {
  url: "What is the first URL of the website you want to crawl?",
  match: "What is the URL pattern you want to match?",
  selector: "What is the CSS selector you want to match? (Leave empty for auto-detection)",
  maxPagesToCrawl: "How many pages do you want to crawl?",
  outputFileName: "What is the name of the output file?",
};

function generateMatchPattern(url: string): string {
  if (!url) return "";
  
  try {
    // If it's a sitemap, we want to match the whole domain (or origin)
    if (url.toLowerCase().endsWith(".xml")) {
      const urlObj = new URL(url);
      return `${urlObj.origin}/**`;
    }
  } catch (e) {
    // ignore invalid URLs, fallback below
  }

  // Ensure we don't end up with //** if the url ends with /
  const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  return `${baseUrl}/**`;
}

async function handler(options: Config & { config?: string }) {
  try {
    let fileConfig: Partial<Config> = {};
    if (options.config) {
      try {
        const fileContent = await readFile(options.config, 'utf-8');
        fileConfig = JSON.parse(fileContent);
      } catch (e) {
        console.error(`Failed to read config file: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }

    const {
      url,
      match,
      exclude,
      selector,
      maxPagesToCrawl: maxPagesToCrawlStr,
      outputFileName,
    } = options;

    // @ts-ignore
    const maxPagesToCrawl = parseInt(maxPagesToCrawlStr, 10);

    let config: Config = {
      url: url || fileConfig.url || "",
      match: match || fileConfig.match || "",
      exclude: exclude || fileConfig.exclude || [],
      selector: selector || fileConfig.selector || "",
      maxPagesToCrawl: maxPagesToCrawlStr ? maxPagesToCrawl : (fileConfig.maxPagesToCrawl || 50),
      outputFileName: outputFileName || fileConfig.outputFileName,
    };

    // Auto-generate match pattern if URL is present but match is missing
    if (config.url && !config.match) {
      config.match = generateMatchPattern(config.url);
    }

    if (!config.url || !config.match) {
      const questions = [];

      if (!config.url) {
        questions.push({
          type: "input",
          name: "url",
          message: messages.url,
        });
      }

      if (!config.match) {
        questions.push({
          type: "input",
          name: "match",
          message: messages.match,
          default: (answers: any) => generateMatchPattern(answers.url || config.url),
        });
      }

      if (!config.selector) {
        questions.push({
          type: "input",
          name: "selector",
          message: messages.selector,
        });
      }

      const answers = await inquirer.prompt(questions);

      config = {
        ...config,
        ...answers,
      };
    }

    await crawl(config);
    await write(config);
  } catch (error) {
    console.log(error);
  }
}

program.version(version).description(description);

program
  .argument("[url]", "The URL to crawl")
  .option("-u, --url <string>", messages.url, "")
  .option("-m, --match <string>", messages.match, "")
  .option("-e, --exclude <string>", "URL pattern to exclude", "")
  .option("-s, --selector <string>", messages.selector, "")
  .option("-n, --maxPagesToCrawl <number>", messages.maxPagesToCrawl, "50")
  .option(
    "-o, --outputFileName <string>",
    messages.outputFileName,
  )
  .option("-c, --config <string>", "Path to a JSON config file")
  .action((urlArg, options) => {
    // If positional argument found, override options.url
    if (urlArg && typeof urlArg === 'string') {
      options.url = urlArg;
    }
    handler(options);
  });

program.parse();
