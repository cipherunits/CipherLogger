# Express

`cipher.express()` returns a standard Express middleware. Mount it before your routes so every request passes through it.

```ts
import express from "express";
import { createCipherLogger } from "cipher-logger";

const app = express();

const cipher = createCipherLogger({
  fields: {
    ip: true,
    userAgent: true,
    query: true,
    requestId: true,
  },
  level: "info",
  prefix: "express",
});

// Mount before your routes
app.use(cipher.express());

app.get("/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## Sample output

```text
[2026-09-01T20:00:00.000Z] [INFO] [express] HTTP Request {
  id: 'a1b2c3d4-...',
  type: 'http',
  timestamp: '2026-09-01T20:00:00.000Z',
  method: 'GET',
  path: '/users?page=1',
  status: 200,
  duration: 12,
  ip: '::1',
  userAgent: 'Mozilla/5.0 ...',
  query: { page: '1' }
}
```

!!! success "Accurate timing"
    In Express, `status` and `duration` are recorded on the `res.finish` event, so they always reflect the **actual** response — including anything that happens deeper in your middleware chain or inside async route handlers.

## Mounting order matters

Mount the middleware as early as possible so it wraps everything downstream, including error handlers:

```ts
app.use(cipher.express());   // 1. logging first
app.use(helmet());           // 2. other middleware
app.use("/api", apiRouter);  // 3. routes
app.use(errorHandler);       // 4. errors still get logged with their final status
```

## Combining with error handlers

Because logging happens on `res.finish`, a request that ends in a thrown error and is converted to a `500` by your error-handling middleware is still logged with `status: 500` and the correct `duration` — no extra wiring required.

## Next steps

- [Configuration](configuration.md) — every `fields` flag explained
- [Next.js](nextjs.md) — the middleware-based adapter and its current timing caveat
- [Log Schema](../reference/log-schema.md) — full shape of a logged request
