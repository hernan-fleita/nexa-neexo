const STORE = new Map();

export function rateLimit(ip, { max = 30, windowMs = 60_000 } = {}) {
  const now = Date.now();
  let entry = STORE.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    STORE.set(ip, entry);
  }
  entry.count++;
  if (STORE.size > 5_000) {
    for (const [k, v] of STORE) {
      if (now > v.resetAt) STORE.delete(k);
    }
  }
  return entry.count <= max;
}

export function clientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function corsHeaders(req, methods = "GET, OPTIONS") {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host") || "";
  const h = { "Access-Control-Allow-Methods": methods, "Access-Control-Allow-Headers": "Content-Type" };
  if (origin) {
    try {
      if (new URL(origin).host === host) {
        h["Access-Control-Allow-Origin"] = origin;
        h["Vary"] = "Origin";
      }
    } catch {}
  }
  return h;
}

export function methodNotAllowed(req, methods = "GET, OPTIONS") {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", ...corsHeaders(req, methods) },
  });
}

export function tooManyRequests(req) {
  return new Response(JSON.stringify({ error: "Too many requests" }), {
    status: 429,
    headers: { "Content-Type": "application/json", "Retry-After": "60", ...corsHeaders(req) },
  });
}
