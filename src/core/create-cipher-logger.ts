import { Logger } from "./logger";
import { buildRequestLog, resolveFieldConfig } from "./build-request-log";
import { loadAdapter } from "./load-adapter";
import type {
  CipherLoggerConfig,
  RequestLog,
  RequestLogInput,
} from "./types";

/** Untyped middleware so the core entry does not pull in peer framework types. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FrameworkMiddleware = (...args: any[]) => any;

export interface CipherLogger {
  logRequest(input: RequestLogInput): RequestLog;
  /** Prefer `import { createExpressMiddleware } from "cipher-logger/express"` for typed Express middleware. */
  express(): FrameworkMiddleware;
  /** Prefer `import { createNextMiddleware } from "cipher-logger/next"` for typed Next.js middleware. */
  next(): FrameworkMiddleware;
  /** Prefer `import { createNuxtMiddleware } from "cipher-logger/nuxt"` for typed Nuxt middleware. */
  nuxt(): FrameworkMiddleware;
  /** Prefer `import { createFastifyMiddleware } from "cipher-logger/fastify"` for typed Fastify hooks. */
  fastify(): FrameworkMiddleware;
  /** Prefer `import { createNestMiddleware } from "cipher-logger/nest"` for typed Nest middleware. */
  nest(): FrameworkMiddleware;
  /** Prefer `import { createHonoMiddleware } from "cipher-logger/hono"` for typed Hono middleware. */
  hono(): FrameworkMiddleware;
}

type ExpressAdapter = {
  createExpressMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};
type NextAdapter = {
  createNextMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};
type NuxtAdapter = {
  createNuxtMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};
type FastifyAdapter = {
  createFastifyMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};
type NestAdapter = {
  createNestMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};
type HonoAdapter = {
  createHonoMiddleware: (cipher: CipherLogger) => FrameworkMiddleware;
};

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
      return loadAdapter<ExpressAdapter>("express").createExpressMiddleware(
        cipherLogger,
      );
    },

    next() {
      return loadAdapter<NextAdapter>("next").createNextMiddleware(
        cipherLogger,
      );
    },

    nuxt() {
      return loadAdapter<NuxtAdapter>("nuxt").createNuxtMiddleware(
        cipherLogger,
      );
    },

    fastify() {
      return loadAdapter<FastifyAdapter>("fastify").createFastifyMiddleware(
        cipherLogger,
      );
    },

    nest() {
      return loadAdapter<NestAdapter>("nest").createNestMiddleware(
        cipherLogger,
      );
    },

    hono() {
      return loadAdapter<HonoAdapter>("hono").createHonoMiddleware(
        cipherLogger,
      );
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
