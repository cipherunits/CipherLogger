# FAQ

## Does CipherLogger replace Winston/Pino?

Not really — they solve different problems. Winston and Pino are general-purpose logging backends (transports, serialization, log shipping). CipherLogger is focused specifically on **HTTP request logging**: it defines a fixed request schema and wires itself into your framework's request lifecycle. You can absolutely pipe CipherLogger's output into Winston or Pino as a transport if you need structured log shipping — CipherLogger doesn't do that itself today.

## Why is `duration` wrong in my Next.js logs?

This is expected with the current Next.js adapter — see the [timing caveat](guide/nextjs.md#timing-caveat). Middleware runs before your route handler, so the adapter can only measure its own execution time, not the full response. A fix (route-handler wrappers) is on the [Roadmap](advanced/roadmap.md).

## Can I use CipherLogger without Express or Next.js?

Yes. The [`Logger`](reference/api.md#logger) class has no framework dependency — use it for startup messages, background jobs, or any non-HTTP logging. For HTTP requests outside a supported framework, call [`cipher.logRequest()`](reference/api.md#cipherlogrequestinput-requestloginput-void) manually with whatever data you have.

## How do I add a custom field that isn't in `fields`?

Enable `metadata` in your config and pass a `metadata` object to `logRequest`, or via the adapter's request context where supported. See [Passing metadata](guide/configuration.md#passing-metadata).

## Does enabling more `fields` hurt performance?

Each enabled field does a small amount of extra work per request (header read, query-string parse, etc.). For most applications this is negligible, but if you're logging at very high request volumes, only enable the fields you actually consume downstream.

## Is CommonJS supported, or only ESM?

Both. CipherLogger ships dual ESM/CJS builds, so `import` and `require` both work out of the box.

## Where do I report a bug or request a framework adapter?

Open an issue on [GitHub](https://github.com/cipherunits/CipherLogger/issues). Check the [Roadmap](advanced/roadmap.md) first — your framework might already be planned.
