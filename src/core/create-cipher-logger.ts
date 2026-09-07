import { createExpressMiddleware } from "../adapters/express/middleware";
import { createNextMiddleware } from "../adapters/next/middleware";
import { Logger } from "./logger";
import { buildRequestLog, resolveFieldConfig } from "./build-request-log";
import type {
  CipherLoggerConfig,
  RequestLog,
  RequestLogInput,
} from "./types";
import type { ExpressMiddleware } from "../adapters/express/middleware";
import type { NextMiddleware } from "../adapters/next/middleware";

export interface CipherLogger {
  logRequest(input: RequestLogInput): RequestLog;
  express(): ExpressMiddleware;
  next(): NextMiddleware;
}

export function createCipherLogger(
  config: CipherLoggerConfig = {},
): CipherLogger {
  const fields = resolveFieldConfig(config.fields);
  const logger = new Logger({
    level: config.level,
    prefix: config.prefix,
  });

  const cipherLogger: CipherLogger = {
    logRequest(input: RequestLogInput): RequestLog {
      const log = buildRequestLog(fields, input);
      logger.info("HTTP Request", log);
      return log;
    },

    express() {
      return createExpressMiddleware(cipherLogger);
    },

    next() {
      return createNextMiddleware(cipherLogger);
    },
  };

  return cipherLogger;
}

export type {
  CipherLoggerConfig,
  OptionalRequestField,
  RequestLog,
  RequestLogInput,
} from "./types";
