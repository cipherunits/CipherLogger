import type { CipherLogger } from "../../core/create-cipher-logger";

export type NuxtRequest = {
  method: string;
  url: string;
  headers: Headers | Record<string, string | string[] | undefined>;
};

export type NuxtResponse = {
  status?: number;
  end: (...args: unknown[]) => unknown;
};

export type NuxtMiddleware = (req: NuxtRequest, res: NuxtResponse) => void;

function getHeader(
  request: NuxtRequest,
  name: string,
): string | undefined {
  if (request.headers instanceof Headers) {
    return request.headers.get(name) ?? undefined;
  }

  const value = request.headers[name.toLowerCase()];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

function parseQuery(url: URL): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  for (const [key, value] of url.searchParams.entries()) {
    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function createNuxtMiddleware(cipher: CipherLogger): NuxtMiddleware {
  return (req, res) => {
    const start = Date.now();
    const originalEnd = res.end.bind(res);

    res.end = ((...args: unknown[]) => {
      const url = new URL(req.url, "http://localhost");

      cipher.logRequest({
        method: req.method,
        path: url.pathname + url.search,
        status: res.status ?? 200,
        duration: Date.now() - start,
        ip:
          getHeader(req, "x-forwarded-for")?.split(",")[0]?.trim() ??
          getHeader(req, "x-real-ip"),
        userAgent: getHeader(req, "user-agent"),
        referer: getHeader(req, "referer"),
        protocol: url.protocol.replace(":", ""),
        host: getHeader(req, "host"),
        query: parseQuery(url),
        requestId: getHeader(req, "x-request-id"),
      });

      return originalEnd(...args);
    }) as typeof res.end;
  };
}
