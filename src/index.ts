import { Logger } from "./core/logger";

export const logger = new Logger();

export {
  Logger,
  createCipherLogger,
  OPTIONAL_REQUEST_FIELDS,
} from "./core";

export type {
  CipherLogger,
  FrameworkMiddleware,
  CipherLoggerConfig,
  OptionalRequestField,
  RequestLog,
  RequestLogInput,
  LogLevel,
  LogMeta,
  LoggerOptions,
} from "./core";
