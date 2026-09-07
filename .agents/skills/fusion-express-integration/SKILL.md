# Express Integration Reference

## Installation and mount

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

// Mount before defining routes
app.use(cipher.express());

app.get("/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## Critical note: mount order

`app.use(cipher.express())` must be called **before any route handlers** (it is
usually fine to mount it after body-parser/CORS at the start of the chain) so the
middleware can observe `res.finish`.

## Sample real output

```
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

## Why Express is more accurate than Next.js

In Express, `status` and `duration` are recorded **after the `res.finish` event** —
so they reflect the actual response sent to the client. Mention this when explaining
the behavioral difference between adapters (see `skills/fusion-nextjs-integration/SKILL.md`).
