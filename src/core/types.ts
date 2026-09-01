import type { LogLevel } from "./logger";

export const OPTIONAL_REQUEST_FIELDS = [
  "ip",
  "userAgent",
  "referer",
  "protocol",
  "host",
  "query",
  "requestId",
  "metadata",
] as const;

export type OptionalRequestField = (typeof OPTIONAL_REQUEST_FIELDS)[number];

export type RequestLog = {
  id: string;
  type: "http";
  timestamp: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  ip?: string;
  userAgent?: string;
  referer?: string;
  protocol?: string;
  host?: string;
  query?: Record<string, string>;
  requestId?: string;
  metadata?: Record<string, unknown>;
};

export type RequestLogInput = {
  method: string;
  path: string;
  status: number;
  duration: number;
  ip?: string;
  userAgent?: string;
  referer?: string;
  protocol?: string;
  host?: string;
  query?: Record<string, string>;
  requestId?: string;
  metadata?: Record<string, unknown>;
};

export type CipherLoggerConfig = {
  fields?: Partial<Record<OptionalRequestField, boolean>>;
  level?: LogLevel;
  prefix?: string;
};
