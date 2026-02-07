/**
 * Selector Scoring Algorithm
 * Based on Mozilla Readability heuristics with enhancements for code preservation
 * 
 * This module implements a hybrid approach:
 * 1. Score all candidate elements using proven heuristics
 * 2. Return top N candidates for AI to choose from
 * 3. Provide fallback if AI fails
 */

import { Page } from "playwright";

export interface ScoredCandidate {
  selector: string;
  score: number;
  element: string; // HTML tag name
  textLength: number;
  hasCodeBlocks: boolean;
  linkDensity: number;
  classId: string;
}

// Heuristic patterns from Mozilla Readability
const PATTERNS = {
  // Elements unlikely to be main content
  unlikely: /banner|breadcrumbs|combx|comment|community|cover|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
  
  // Elements likely to be main content
  positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story|post-body/i,
  
  // Additional negative patterns (stronger signal)
  negative: /hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
  
  // Code-specific patterns (BOOST for technical content)
  code: /highlight|syntax|code|pre|prism|token|keyword|hljs|language-/i
};

/**
 * Extract candidate elements and their metadata from the page
 */
export async function extractCandidates(page: Page): Promise<ScoredCandidate[]> {
  return await page.evaluate(() => {
    const candidates: ScoredCandidate[] = [];
    const scored = new Map<Element, number>();
    
    // Helper: Get text-to-tag ratio
    function getTextToTagRatio(element: Element): number {
      const text = element.textContent?.length || 0;
      const tags = element.getElementsByTagName('*').length || 1;
      return text / tags;
    }
    
    // Helper: Calculate link density (ratio of link text to total text)
    function getLinkDensity(element: Element): number {
      const totalText = element.textContent?.length || 0;
      if (totalText === 0) return 0;
      
      const links = element.querySelectorAll('a');
      const linkText = Array.from(links).reduce((sum, link) => {
        return sum + (link.textContent?.length || 0);
      }, 0);
      
      return linkText / totalText;
    }
    
    // Helper: Check if element has code blocks
    function hasCodeBlocks(element: Element): boolean {
      return element.querySelector('pre, code') !== null;
    }
    
    // Helper: Get class and ID string for pattern matching
    function getClassId(element: Element): string {
      return (element.className || '') + ' ' + (element.id || '');
    }
    
    // Helper: Count commas (proxy for prose complexity)
    function countCommas(text: string): number {
      return (text.match(/,/g) || []).length;
    }
    
    // Step 1: Find all potential content containers
    const contentNodes = document.querySelectorAll('p, div, article, section, main, pre');
    
    contentNodes.forEach(node => {
      const element = node as Element;
      const text = element.textContent || '';
      const textLen = text.length;
      
      // Skip tiny elements (unless they're code blocks)
      if (textLen < 25 && element.tagName !== 'PRE') return;
      
      const parent = element.parentElement;
      if (!parent) return;
      
      // Initialize score
      let contentScore = 0;
      
      // A. TAG TYPE BONUS
      switch (element.tagName) {
        case 'PRE':
          contentScore += 50; // MASSIVE BOOST for code blocks
          break;
        case 'CODE':
          contentScore += 30;
          break;
        case 'ARTICLE':
          contentScore += 20;
          break;
        case 'SECTION':
          contentScore += 10;
          break;
        case 'MAIN':
          contentScore += 15;
          break;
        case 'P':
          contentScore += 5;
          break;
        case 'DIV':
          contentScore += 2;
          break;
      }
      
      // B. CLASS/ID PATTERN MATCHING
      const classId = getClassId(element);
      const patterns = {
        unlikely: /banner|breadcrumbs|combx|comment|community|cover|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
        positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story|post-body/i,
        negative: /hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
        code: /highlight|syntax|code|pre|prism|token|keyword|hljs|language-/i
      };
      
      if (patterns.positive.test(classId)) contentScore += 25;
      if (patterns.code.test(classId)) contentScore += 30; // Code-specific boost
      if (patterns.negative.test(classId)) contentScore -= 25;
      if (patterns.unlikely.test(classId)) contentScore -= 15;
      
      // C. TEXT CHARACTERISTICS
      // Length bonus (capped)
      contentScore += Math.min(Math.floor(textLen / 100), 50);
      
      // Comma bonus (prose complexity indicator)
      const commas = countCommas(text);
      contentScore += Math.min(commas, 20);
      
      // Text-to-Tag Ratio bonus
      const ttr = getTextToTagRatio(element);
      if (ttr > 20) contentScore += 15;
      else if (ttr > 10) contentScore += 10;
      else if (ttr < 2) contentScore -= 10; // Penalize tag soup
      
      // D. CODE BLOCK DETECTION
      if (hasCodeBlocks(element)) {
        contentScore += 40; // Significant boost if contains code
      }
      
      // E. LINK DENSITY PENALTY
      const linkDensity = getLinkDensity(element);
      if (linkDensity > 0.5) {
        contentScore *= 0.3; // Heavy penalty for navigation-like content
      } else if (linkDensity > 0.33) {
        contentScore *= 0.7;
      }
      
      // F. SCORE PROPAGATION (Readability's clustering algorithm)
      // Propagate score to parent and grandparent
      const currentParentScore = scored.get(parent) || 0;
      scored.set(parent, currentParentScore + contentScore);
      
      const grandParent = parent.parentElement;
      if (grandParent) {
        const currentGpScore = scored.get(grandParent) || 0;
        scored.set(grandParent, currentGpScore + (contentScore * 0.5));
      }
    });
    
    // Step 2: Convert scored elements to candidates
    scored.forEach((score, element) => {
      // Generate CSS selector
      let selector = element.tagName.toLowerCase();
      if (element.id) {
        selector = '#' + element.id;
      } else if (element.className) {
        const classes = element.className.trim().split(/\s+/);
        if (classes.length > 0 && classes[0]) {
          selector = '.' + classes[0];
        }
      }
      
      candidates.push({
        selector,
        score,
        element: element.tagName,
        textLength: element.textContent?.length || 0,
        hasCodeBlocks: hasCodeBlocks(element),
        linkDensity: getLinkDensity(element),
        classId: getClassId(element)
      });
    });
    
    // Step 3: Sort by score (highest first)
    candidates.sort((a, b) => b.score - a.score);
    
    return candidates;
  });
}

/**
 * Get top N candidates for AI selection
 */
export function getTopCandidates(candidates: ScoredCandidate[], n: number = 3): ScoredCandidate[] {
  return candidates.slice(0, n);
}

/**
 * Get the best candidate (fallback if AI fails)
 */
export function getBestCandidate(candidates: ScoredCandidate[]): ScoredCandidate | null {
  return candidates.length > 0 ? candidates[0] : null;
}

/**
 * Format candidates for AI prompt
 */
export function formatCandidatesForAI(candidates: ScoredCandidate[]): string {
  return candidates.map((c, idx) => {
    return `${idx + 1}. Selector: ${c.selector}
   Score: ${c.score.toFixed(1)}
   Element: <${c.element}>
   Text Length: ${c.textLength} chars
   Has Code: ${c.hasCodeBlocks ? 'Yes' : 'No'}
   Link Density: ${(c.linkDensity * 100).toFixed(1)}%
   Classes/ID: ${c.classId || '(none)'}`;
  }).join('\n\n');
}
