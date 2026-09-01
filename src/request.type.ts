export type request = {
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
