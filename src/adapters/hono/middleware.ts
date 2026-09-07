import type { Context } from "hono";

import type { CipherLogger } from "../../core/create-cipher-logger";

export type HonoMiddleware = (
  c: Context,
  next: () => Promise<void>,
) => Response | Promise<Response>;

function getHeader(request: any, name: string): string | undefined {
  if (!request) return undefined;

  if (typeof request.header === "function") {
    return request.header(name) ?? undefined;
  }

  if (request.headers && typeof request.headers.get === "function") {
    return request.headers.get(name) ?? undefined;
  }

  return undefined;
}

function parseQuery(urlString: string): Record<string, string> | undefined {
  try {
    const url = new URL(urlString);
    const result: Record<string, string> = {};

    for (const [key, value] of url.searchParams.entries()) {
      result[key] = value;
    }

    return Object.keys(result).length > 0 ? result : undefined;
  } catch {
    return undefined;
  }
}

export function createHonoMiddleware(cipher: CipherLogger): HonoMiddleware {
  return async (c, next) => {
    const start = Date.now();

    await next();

    const req = (c as any).req ?? (c as any).request;
    const url = typeof req?.url === "string" ? req.url : String(req?.url ?? "");
    const parsed = new URL(url, "http://localhost");

    let status = 200;
    const cres = (c as any).res ?? (c as any).response ?? undefined;
    if (cres && typeof (cres as any).status === "number") {
      status = (cres as any).status as number;
    } else if (cres && typeof (cres as any).statusCode === "number") {
      status = (cres as any).statusCode as number;
    }

    const xfwd = getHeader(req, "x-forwarded-for");
    const ip = xfwd ? String(xfwd).split(",")[0].trim() : getHeader(req, "x-real-ip") ?? undefined;

    cipher.logRequest({
      method: req?.method,
      path: parsed.pathname + parsed.search,
      status,
      duration: Date.now() - start,
      ip,
      userAgent: getHeader(req, "user-agent"),
      referer: getHeader(req, "referer"),
      protocol: parsed.protocol.replace(":", ""),
      host: getHeader(req, "host"),
      query: parseQuery(url),
      requestId: getHeader(req, "x-request-id"),
    });

    return (cres as any) ?? new Response(null, { status });
  };
}
