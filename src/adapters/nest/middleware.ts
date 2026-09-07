import type { NextFunction, Request, Response } from "express";

import type { CipherLogger } from "../../core/create-cipher-logger";

export type NestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

function parseQuery(query: Request["query"]): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    result[key] =
      typeof value === "string"
        ? value
        : Array.isArray(value)
          ? String(value[0] ?? "")
          : String(value);
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function getHeader(req: Request, name: string): string | undefined {
  const value = req.headers[name];

  if (value === undefined) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value as string;
}

export function createNestMiddleware(cipher: CipherLogger): NestMiddleware {
  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      cipher.logRequest({
        method: req.method,
        path: req.originalUrl || req.url,
        status: res.statusCode,
        duration: Date.now() - start,
        ip: (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() || req.ip || req.socket.remoteAddress,
        userAgent: getHeader(req, "user-agent"),
        referer: getHeader(req, "referer"),
        protocol: req.protocol,
        host: getHeader(req, "host"),
        query: parseQuery(req.query),
        requestId: getHeader(req, "x-request-id"),
      });
    });

    next();
  };
}
