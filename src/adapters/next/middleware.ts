import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { CipherLogger } from "../../core/create-cipher-logger";

export type NextMiddleware = (
  request: NextRequest,
) => NextResponse | Promise<NextResponse>;

function getHeader(
  request: NextRequest,
  name: string,
): string | undefined {
  return request.headers.get(name) ?? undefined;
}

function parseQuery(request: NextRequest): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function createNextMiddleware(cipher: CipherLogger): NextMiddleware {
  return (request) => {
    const start = Date.now();
    const response = NextResponse.next();

    cipher.logRequest({
      method: request.method,
      path: request.nextUrl.pathname + request.nextUrl.search,
      status: response.status,
      duration: Date.now() - start,
      ip:
        getHeader(request, "x-forwarded-for")?.split(",")[0]?.trim() ||
        getHeader(request, "x-real-ip"),
      userAgent: getHeader(request, "user-agent"),
      referer: getHeader(request, "referer"),
      protocol: request.nextUrl.protocol.replace(":", ""),
      host: getHeader(request, "host"),
      query: parseQuery(request),
      requestId: getHeader(request, "x-request-id"),
    });

    return response;
  };
}
