import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage } from "@langchain/core/messages";
import { configDotenv } from "dotenv";
import { Page } from "playwright";
import { 
  extractCandidates, 
  getTopCandidates, 
  getBestCandidate, 
  formatCandidatesForAI,
  type ScoredCandidate 
} from "./selector_scoring.js";

configDotenv();

// IMPORTANT: Never hardcode API keys! Always use environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const GEMINI_TEMPERATURE = parseFloat(process.env.GEMINI_TEMPERATURE || "0.1");
const GEMINI_MAX_TOKENS = parseInt(process.env.GEMINI_MAX_TOKENS || "100");

if (!GEMINI_API_KEY) {
  console.warn("Warning: GEMINI_API_KEY not set. AI selector will fall back to scoring algorithm.");
}

console.log(`Using Gemini model: ${GEMINI_MODEL} (temp: ${GEMINI_TEMPERATURE}, max_tokens: ${GEMINI_MAX_TOKENS})`);

const model = GEMINI_API_KEY ? new ChatGoogleGenerativeAI({
  model: GEMINI_MODEL,
  maxOutputTokens: GEMINI_MAX_TOKENS,
  apiKey: GEMINI_API_KEY,
  temperature: GEMINI_TEMPERATURE,
}) : null;

/**
 * HYBRID SELECTOR DETECTION
 * 
 * Approach:
 * 1. Run Readability-style scoring algorithm on page
 * 2. Get top 3 candidates
 * 3. Ask AI to choose the best one
 * 4. Fallback to highest-scored if AI fails
 * 
 * Benefits:
 * - Fast deterministic scoring
 * - AI provides "common sense" tie-breaker
 * - Guaranteed fallback
 * - Preserves code blocks (boosted in scoring)
 */
export async function predictSelector(page: Page, url: string): Promise<string> {
  const DEFAULT_SELECTOR = "body";
  
  try {
    console.log("🔍 Step 1: Running algorithmic scoring...");
    
    // Step 1: Extract and score all candidates using proven heuristics
    const allCandidates = await extractCandidates(page);
    
    if (allCandidates.length === 0) {
      console.warn("No candidates found. Using default selector.");
      return DEFAULT_SELECTOR;
    }
    
    console.log(`   Found ${allCandidates.length} candidates`);
    
    // Step 2: Get top 3 candidates
    const topCandidates = getTopCandidates(allCandidates, 3);
    const bestCandidate = getBestCandidate(allCandidates);
    
    console.log(`   Top candidate: ${bestCandidate?.selector} (score: ${bestCandidate?.score.toFixed(1)})`);
    
    // Step 3: If AI is available, ask it to choose between top candidates
    if (model && topCandidates.length > 1) {
      console.log("🤖 Step 2: Consulting AI for final choice...");
      
      const aiChoice = await askAIToChoose(topCandidates, url);
      
      if (aiChoice && isValidSelector(aiChoice)) {
        console.log(`   AI selected: ${aiChoice}`);
        return aiChoice;
      } else {
        console.warn(`   AI returned invalid selector: "${aiChoice}"`);
      }
    }
    
    // Step 4: Fallback to highest-scored candidate
    if (bestCandidate) {
      console.log(`✅ Using top-scored selector: ${bestCandidate.selector}`);
      return bestCandidate.selector;
    }
    
    return DEFAULT_SELECTOR;
    
  } catch (error) {
    console.error("Selector prediction failed:", error);
    return DEFAULT_SELECTOR;
  }
}

/**
 * Ask AI to choose the best selector from top candidates
 */
async function askAIToChoose(candidates: ScoredCandidate[], url: string): Promise<string | null> {
  if (!model) return null;
  
  try {
    const candidatesText = formatCandidatesForAI(candidates);
    
    const systemPrompt = `You are a CSS selector expert. Your job: choose the BEST selector for main article content.

URL: ${url}

I've already scored ${candidates.length} candidates using Readability heuristics (Text-to-Tag ratio, link density, code blocks, etc.).

Your task: Pick the ONE selector most likely to contain the main article text.

CANDIDATES (ranked by algorithmic score):

${candidatesText}

SELECTION CRITERIA:
1. Prefer selectors with HIGH scores (algorithm is usually right)
2. Prefer elements with low link density (< 30%)
3. Prefer elements that contain code blocks for technical sites
4. Avoid generic tags like "body" unless no better option
5. Prefer class selectors over tag selectors

CRITICAL: Return ONLY the CSS selector, nothing else. No explanation, no quotes, no markdown.

Examples of valid responses:
.article-content
#main-content
article
.post-body

Choose now:`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt)
    ]);
    
    const selector = cleanSelector(response.content.toString());
    return selector;
    
  } catch (error) {
    console.error("AI choice failed:", error);
    return null;
  }
}

/**
 * Clean and validate selector returned by AI
 */
function cleanSelector(raw: string): string {
  // Remove markdown, quotes, newlines, extra spaces
  let cleaned = raw
    .replace(/```/g, '')
    .replace(/`/g, '')
    .replace(/["']/g, '')
    .replace(/\n/g, ' ')
    .trim();
  
  // If AI returned multiple selectors or explanation, take first word
  if (cleaned.includes(' ')) {
    const parts = cleaned.split(/[\s,]+/);
    cleaned = parts[0];
  }
  
  return cleaned;
}

/**
 * Validate that a selector is syntactically correct
 */
function isValidSelector(selector: string): boolean {
  if (!selector || selector.length === 0) return false;
  if (selector.length > 100) return false;
  
  // Must not be just a dot or hash
  if (selector === '.' || selector === '#') return false;
  
  // Basic CSS selector validation
  const validPattern = /^[a-zA-Z0-9\-_#.\[\]:]+$/;
  if (!validPattern.test(selector)) return false;
  
  // Reject obviously bad selectors
  const rejectList = ['body', 'html', 'div', 'span', '*'];
  if (rejectList.includes(selector.toLowerCase())) return false;
  
  return true;
}
