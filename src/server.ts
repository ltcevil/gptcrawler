import express, { Express } from "express";
import cors from "cors";
import { readFile } from "fs/promises";
import { Config, configSchema } from "./config.js";
import { configDotenv } from "dotenv";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerDocument from "../swagger-output.json" assert { type: "json" };
import GPTCrawlerCore from "./core.js";
import { PathLike } from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
configDotenv();

const app: Express = express();
const port = Number(process.env.API_PORT) || 3000;
const hostname = process.env.API_HOST || "localhost";

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function notifyTelegram(filePath: string, sourceUrl: string) {
  const token = "7612813369:AAErtB_H2FAq1rSJM6ufHBb8EYvT9sCEDfU";
  const chatId = "-1001448363731";
  const date = new Date().toISOString().split("T")[0];
  const caption = `xtracted content from ${sourceUrl} ${date}`;

  // Using sendDocument because JSON files are usually > 4KB
  const cmd = `curl -v -F document=@${filePath} -F chat_id=${chatId} -F "caption=${caption}" https://api.telegram.org/bot${token}/sendDocument`;

  try {
    await execAsync(cmd);
    console.log("Successfully sent crawl result to Telegram");
  } catch (error) {
    console.error("Failed to send crawl result to Telegram:", error);
  }
}

// Define a POST route to accept config and run the crawler
app.post("/crawl", async (req, res) => {
  const config: Config = req.body;

  // Apply rate limiting defaults from environment variables
  if (config.maxConcurrency === undefined && process.env.MAX_CONCURRENCY) {
    config.maxConcurrency = parseInt(process.env.MAX_CONCURRENCY);
  }
  if (config.requestDelay === undefined && process.env.REQUEST_DELAY) {
    config.requestDelay = parseInt(process.env.REQUEST_DELAY);
  }
  if (config.maxRequestRetries === undefined && process.env.MAX_REQUEST_RETRIES) {
    config.maxRequestRetries = parseInt(process.env.MAX_REQUEST_RETRIES);
  }
  
  // Apply proxy URLs from environment if not provided
  if (!config.proxyUrls && process.env.PROXY_URLS) {
    config.proxyUrls = process.env.PROXY_URLS.split(',').map(p => p.trim()).filter(p => p);
  }

  // Auto-generate match pattern if URL is present but match is missing
  if (config.url && !config.match) {
    try {
      const urlObj = new URL(config.url);
      const pathParts = urlObj.pathname.split('/').filter(p => p);
      
      // Go back one level (remove last segment) and add /**
      // Example: /belfold/2026/02/07/article/ -> /belfold/2026/02/07/**
      if (pathParts.length > 0) {
        pathParts.pop(); // Remove last segment
      }
      
      const basePath = pathParts.length > 0 ? '/' + pathParts.join('/') : '';
      config.match = `${urlObj.protocol}//${urlObj.host}${basePath}/**`;
      
      console.log(`Auto-generated match pattern: ${config.match}`);
    } catch (e) {
      // Fallback to old behavior if URL parsing fails
      const baseUrl = config.url.endsWith("/") ? config.url.slice(0, -1) : config.url;
      config.match = `${baseUrl}/**`;
    }
  }

  try {
    const validatedConfig = configSchema.parse(config);
    const crawler = new GPTCrawlerCore(validatedConfig);
    await crawler.crawl();
    const outputFileName: PathLike = await crawler.write();

    // Send to Telegram bot as requested
    await notifyTelegram(outputFileName.toString(), validatedConfig.url);

    const outputFileContent = await readFile(outputFileName, "utf-8");
    res.contentType("application/json");
    return res.send(outputFileContent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred during crawling", error });
  }
});

app.listen(port, hostname, () => {
  console.log(`API server listening at http://${hostname}:${port}`);
});

export default app;
