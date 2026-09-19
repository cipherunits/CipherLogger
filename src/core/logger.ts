export type LogLevel = "info" | "warn" | "error" | "debug";

export type LogMeta = Record<string, unknown>;

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private readonly level: LogLevel;
  private readonly prefix?: string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? "debug";
    this.prefix = options.prefix;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.level];
  }

  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();

    const prefix = this.prefix ? ` [${this.prefix}]` : "";

    return `[${timestamp}] [${level.toUpperCase()}]${prefix} ${message}`;
  }

  private log(
    level: LogLevel,
    message: string,
    meta?: LogMeta,
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const output = this.format(level, message);

    switch (level) {
      case "error":
        if (meta) {
          console.error(output, meta);
        } else {
          console.error(output);
        }
        break;

      case "warn":
        if (meta) {
          console.warn(output, meta);
        } else {
          console.warn(output);
        }
        break;

      case "debug":
        if (meta) {
          console.debug(output, meta);
        } else {
          console.debug(output);
        }
        break;

      case "info":
        if (meta) {
          console.info(output, meta);
        } else {
          console.info(output);
        }
        break;
    }
  }

  info(message: string, meta?: LogMeta): void {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: LogMeta): void {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: LogMeta): void {
    this.log("error", message, meta);
  }

  debug(message: string, meta?: LogMeta): void {
    this.log("debug", message, meta);
  }
}
