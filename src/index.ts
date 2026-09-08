import { Logger } from "./core/logger";

export const logger = new Logger();

export { Logger, createCipherLogger } from "./core";
export { createExpressMiddleware } from "./adapters/express/middleware";
export { createNextMiddleware } from "./adapters/next/middleware";
export { createReactMiddleware } from "./adapters/react/middleware";
export { createVueMiddleware } from "./adapters/vue/middleware";
export { createNuxtMiddleware } from "./adapters/nuxt/middleware";
export { createFastifyMiddleware } from "./adapters/fastify/middleware";
export { createNestMiddleware } from "./adapters/nest/middleware";
export { createHonoMiddleware } from "./adapters/hono/middleware";

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
export type { ReactMiddleware } from "./adapters/react/middleware";
export type { VueMiddleware } from "./adapters/vue/middleware";
export type { NuxtMiddleware } from "./adapters/nuxt/middleware";
export type { FastifyMiddleware } from "./adapters/fastify/middleware";
export type { NestMiddleware } from "./adapters/nest/middleware";
export type { HonoMiddleware } from "./adapters/hono/middleware";

// Backward compatibility
export type { RequestLog as request } from "./core";
