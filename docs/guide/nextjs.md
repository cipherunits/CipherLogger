# Next.js

CipherLogger integrates as `middleware.ts` at your project root (or `src/middleware.ts`).

## Full setup

```ts
// middleware.ts
import { createCipherLogger } from "cipher-logger";
import type { NextRequest } from "next/server";

const cipher = createCipherLogger({
  fields: {
    ip: true,
    userAgent: true,
    host: true,
    query: true,
  },
  level: "info",
});

export function middleware(request: NextRequest) {
  return cipher.next()(request);
}

export const config = {
  matcher: [
    /*
     * Match all routes except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## Concise form

If you don't need a custom `middleware` function, export the adapter directly:

```ts
// middleware.ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true },
});

export default cipher.next();

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
```

## Scoping with `matcher`

Use the `matcher` config to avoid logging static assets, prefetches, and other noise. A narrower matcher (e.g. `/api/:path*`) also reduces overhead on high-traffic routes you don't care about.

## Timing caveat

!!! warning "`status` and `duration` reflect middleware execution, not the final route response"
    Next.js middleware runs **before** the route handler. Because of this, the `status` and `duration` fields recorded by the Next.js adapter describe the middleware's own execution — not what the route handler eventually returns to the client.

    In practice this means:

    - `duration` will usually be very small (middleware execution time only)
    - `status` may not match the status code the browser ultimately receives

    **Workaround for accurate response-level logging today:** wrap your route handlers directly (e.g. call `logger.logRequest(...)` manually at the end of the handler, or use the Express adapter if you're running a custom server).

    Route handler wrappers that log the true final response are planned — see the [Roadmap](../advanced/roadmap.md).

## Next steps

- [Configuration](configuration.md) — every `fields` flag explained
- [Express](express.md) — the adapter with response-accurate `status`/`duration` today
- [Roadmap](../advanced/roadmap.md) — planned framework support and route-handler wrappers
