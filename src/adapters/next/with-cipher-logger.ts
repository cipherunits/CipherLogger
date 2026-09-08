import type { NextRequest } from "next/server";

import type { CipherLogger } from "../../core/create-cipher-logger";

type RouteContext = { params: Promise<Record<string, string | string[]>> };

export type RouteHandler = (
  request: NextRequest,
  context: RouteContext,
) => Response | Promise<Response>;

function getHeader(request: NextRequest, name: string): string | undefined {
  return request.headers.get(name) ?? undefined;
}

function parseQuery(request: NextRequest): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Wraps a Next.js App Router Route Handler (e.g. `app/api/users/route.ts`)
 * to produce accurate `status` and `duration` values — the real equivalent
 * of the Express adapter's `res.on('finish')` behavior.
 *
 * Unlike `createNextMiddleware`, this runs the actual handler and reads the
 * real `Response` it returns (or the error it throws), so the logged
 * status/duration reflect what the client actually received.
 *
 * @example
 * // app/api/users/route.ts
 * import { withCipherLogger } from "cipher-logger/next";
 * import { cipher } from "@/lib/cipher";
 *
 * export const GET = withCipherLogger(cipher, async (request) => {
 *   return Response.json({ users: [] });
 * });
 */
export function withCipherLogger(
  cipher: CipherLogger,
  handler: RouteHandler,
): RouteHandler {
  return async (request, context) => {
    const start = Date.now();
    let status = 500;

    try {
      const response = await handler(request, context);
      status = response.status;
      return response;
    } catch (err) {
      status = 500;
      throw err;
    } finally {
      cipher.logRequest({
        method: request.method,
        path: request.nextUrl.pathname + request.nextUrl.search,
        status,
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
        metadata: { source: "route-handler", accurate: true },
      });
    }
  };
}