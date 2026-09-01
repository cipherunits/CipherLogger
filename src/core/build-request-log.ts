import { randomUUID } from "node:crypto";

import {
  OPTIONAL_REQUEST_FIELDS,
  type OptionalRequestField,
  type RequestLog,
  type RequestLogInput,
} from "./types";

export function resolveFieldConfig(
  fields?: Partial<Record<OptionalRequestField, boolean>>,
): Record<OptionalRequestField, boolean> {
  const resolved = {} as Record<OptionalRequestField, boolean>;

  for (const field of OPTIONAL_REQUEST_FIELDS) {
    resolved[field] = fields?.[field] ?? false;
  }

  return resolved;
}

export function buildRequestLog(
  fields: Record<OptionalRequestField, boolean>,
  input: RequestLogInput,
): RequestLog {
  const log: RequestLog = {
    id: randomUUID(),
    type: "http",
    timestamp: new Date().toISOString(),
    method: input.method,
    path: input.path,
    status: input.status,
    duration: input.duration,
  };

  for (const field of OPTIONAL_REQUEST_FIELDS) {
    if (!fields[field] || input[field] === undefined) {
      continue;
    }

    switch (field) {
      case "ip":
        log.ip = input.ip;
        break;
      case "userAgent":
        log.userAgent = input.userAgent;
        break;
      case "referer":
        log.referer = input.referer;
        break;
      case "protocol":
        log.protocol = input.protocol;
        break;
      case "host":
        log.host = input.host;
        break;
      case "query":
        log.query = input.query;
        break;
      case "requestId":
        log.requestId = input.requestId;
        break;
      case "metadata":
        log.metadata = input.metadata;
        break;
    }
  }

  return log;
}
