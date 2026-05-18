export const config = { runtime: "edge" };

import { rateLimit, clientIp, corsHeaders, tooManyRequests, methodNotAllowed } from "./_rateLimiter.js";

const ALLOWED_MODELS = new Set([
  "claude-sonnet-4-6",
  "claude-opus-4-7",
  "claude-haiku-4-5-20251001",
]);

const MAX_TOKENS_LIMIT = 4096;

function sanitizeBody(raw) {
  if (!raw || typeof raw !== "object") return null;

  const model = ALLOWED_MODELS.has(raw.model) ? raw.model : "claude-haiku-4-5-20251001";
  const max_tokens = Math.min(Number(raw.max_tokens) || 1024, MAX_TOKENS_LIMIT);

  let system;
  if (typeof raw.system === "string") {
    system = raw.system.slice(0, 20_000);
  } else if (Array.isArray(raw.system)) {
    system = raw.system
      .filter(b => b && typeof b.type === "string")
      .map(b => {
        const block = { type: b.type };
        if (b.type === "text" && typeof b.text === "string") block.text = b.text.slice(0, 20_000);
        if (b.cache_control) block.cache_control = { type: "ephemeral" };
        return block;
      });
  }

  if (!Array.isArray(raw.messages)) return null;
  const messages = raw.messages
    .filter(m => m && (m.role === "user" || m.role === "assistant"))
    .map(m => ({ role: m.role, content: m.content }));

  if (!messages.length) return null;

  const body = { model, max_tokens, messages };
  if (system) body.system = system;

  if (Array.isArray(raw.tools)) {
    body.tools = raw.tools
      .filter(t => t && typeof t.name === "string" && typeof t.description === "string" && t.input_schema)
      .slice(0, 32)
      .map(t => {
        const tool = { name: t.name, description: t.description, input_schema: t.input_schema };
        if (t.cache_control) tool.cache_control = { type: "ephemeral" };
        return tool;
      });
  }

  return body;
}

export default async function handler(req) {
  const cors = corsHeaders(req, "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== "POST") return methodNotAllowed(req, "POST, OPTIONS");

  if (!rateLimit(clientIp(req), { max: 20, windowMs: 60_000 })) {
    return tooManyRequests(req);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Service unavailable" }), {
      status: 503, headers: { "Content-Type": "application/json", ...cors },
    });
  }

  try {
    const raw  = await req.json();
    const body = sanitizeBody(raw);

    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Upstream error" }), {
        status: response.status, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", ...cors },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Request failed" }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
}
