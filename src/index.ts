import { Logger } from "./core/logger";

export const logger = new Logger();

export { Logger, createCipherLogger } from "./core";
export { createExpressMiddleware } from "./adapters/express/middleware";
export { createNextMiddleware } from "./adapters/next/middleware";

export type { LogLevel, LogMeta, LoggerOptions } from "./core/logger";
export type {
  CipherLogger,
  CipherLoggerConfig,
  OptionalRequestField,
  RequestLog,
  RequestLogInput,
} from "./core";
export type { ExpressMiddleware } from "./adapters/express/middleware";
export type { NextMiddleware } from "./adapters/next/middleware";

// Backward compatibility
export type { RequestLog as request } from "./core";
