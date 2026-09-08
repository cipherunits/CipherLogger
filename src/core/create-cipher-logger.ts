import { createExpressMiddleware } from "../adapters/express/middleware";
import { createNextMiddleware } from "../adapters/next/middleware";
import { createFastifyMiddleware } from "../adapters/fastify/middleware";
import { createNestMiddleware } from "../adapters/nest/middleware";
import { createHonoMiddleware } from "../adapters/hono/middleware";
import { createReactMiddleware } from "../adapters/react/middleware";
import { createVueMiddleware } from "../adapters/vue/middleware";
import { createNuxtMiddleware } from "../adapters/nuxt/middleware";
import { Logger } from "./logger";
import { buildRequestLog, resolveFieldConfig } from "./build-request-log";
import type {
  CipherLoggerConfig,
  RequestLog,
  RequestLogInput,
} from "./types";
import type { ExpressMiddleware } from "../adapters/express/middleware";
import type { NextMiddleware } from "../adapters/next/middleware";
import type { FastifyMiddleware } from "../adapters/fastify/middleware";
import type { NestMiddleware } from "../adapters/nest/middleware";
import type { HonoMiddleware } from "../adapters/hono/middleware";
import type { ReactMiddleware } from "../adapters/react/middleware";
import type { VueMiddleware } from "../adapters/vue/middleware";
import type { NuxtMiddleware } from "../adapters/nuxt/middleware";

export interface CipherLogger {
  logRequest(input: RequestLogInput): RequestLog;
  express(): ExpressMiddleware;
  next(): NextMiddleware;
  react(): ReactMiddleware;
  vue(): VueMiddleware;
  nuxt(): NuxtMiddleware;
  fastify(): FastifyMiddleware;
  nest(): NestMiddleware;
  hono(): HonoMiddleware;
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
    react() {
      return createReactMiddleware(cipherLogger);
    },
    vue() {
      return createVueMiddleware(cipherLogger);
    },
    nuxt() {
      return createNuxtMiddleware(cipherLogger);
    },
    fastify() {
      return createFastifyMiddleware(cipherLogger);
    },
    nest() {
      return createNestMiddleware(cipherLogger);
    },
    hono() {
      return createHonoMiddleware(cipherLogger);
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
