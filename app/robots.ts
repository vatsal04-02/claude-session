import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

/* AI search and answer engines, named so it's explicit that they're welcome (GEO). Everything else is covered by "*". */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User",
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Copilot
  "CCBot", // Common Crawl (used by many models)
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "YouBot",
  "MistralAI-User",
];

/** Production: everything public is crawlable (CSS/JS/images included), by search and AI crawlers alike. Previews: nothing is. */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
