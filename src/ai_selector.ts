import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain_core/messages";
import { configDotenv } from "dotenv";

configDotenv();

// Use the API key provided in the instructions
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyD7ndMDa1E3LoJaB0Mu4sjGBdeHejbEFdo";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.0-flash-exp",
  maxOutputTokens: 100,
  apiKey: GEMINI_API_KEY,
  temperature: 0,
});

export async function predictSelector(htmlSnippet: string, url: string): Promise<string> {
  try {
    const systemInstruction = `You are an expert web scraper. Your task is to identify the best CSS selector for the main content of a webpage given a snippet of its HTML structure.
          
Guidelines:
1. Focus on the main article text, blog post body, or documentation content.
2. Avoid navigation menus, sidebars, footers, and headers.
3. Prefer semantic tags (article, main) if they look correct, or specific IDs/classes like #content, .post-body, .documentation-container.
4. Return ONLY the CSS selector string. Do not add explanation or markdown code blocks.
5. If you cannot be sure, default to 'body'.`;

    const prompt = `URL: ${url}\n\nHTML Structure Snippet:\n${htmlSnippet}`;

    const messages = [
      new SystemMessage(systemInstruction),
      new HumanMessage(prompt),
    ];

    const response = await model.invoke(messages);
    
    let selector = "";
    if (typeof response.content === "string") {
        selector = response.content.trim();
    } else if (Array.isArray(response.content)) {
        // Handle multimodal or complex content if returned
        const textPart = response.content.find(p => typeof p === 'string' || (typeof p === 'object' && 'type' in p && p.type === 'text'));
        selector = typeof textPart === 'string' ? textPart : (textPart as any)?.text || "";
    }

    // Basic cleaning of markdown if the model ignored instructions
    selector = selector.replace(/```css/g, "").replace(/```/g, "").trim();

    return selector || "body";
  } catch (error) {
    console.error("Error predicting selector with Gemini LLM:", error);
    return "body";
  }
}