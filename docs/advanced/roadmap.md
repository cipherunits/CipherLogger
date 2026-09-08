# Roadmap

CipherLogger is under active development. This page tracks what's planned so you can decide whether to wait for a feature or work around it today.

## Framework adapters

| Framework | Status |
| --------- | ------ |
| Express   | :material-check-circle:{ style="color: #4caf50" } Stable |
| Next.js   | :material-check-circle:{ style="color: #4caf50" } Stable (see [timing caveat](../guide/nextjs.md#timing-caveat)) |
| Fastify   | :material-clock-outline: Planned |
| Hono      | :material-clock-outline: Planned |
| NestJS    | :material-clock-outline: Planned |
| Nuxt      | :material-clock-outline: Planned |

## Accurate Next.js response logging

Today, the Next.js adapter logs during middleware execution, so `status` and `duration` don't reflect the final route response (full explanation in the [Next.js guide](../guide/nextjs.md#timing-caveat)). Route-handler wrappers that log the *actual* final response are planned, mirroring how the Express adapter already works via `res.finish`.

## Package structure

A restructure of `src/` into clearer `core/` and `adapters/` directories is planned, so that adding a new framework adapter is a self-contained addition rather than a change scattered across the package. Subpath exports (e.g. `cipher-logger/express`, `cipher-logger/next`) are also being considered, so importing one adapter doesn't pull in code for frameworks you don't use.

## Contributing to the roadmap

Have a framework you'd like supported, or a field you think should be built in? Open an issue on [GitHub](https://github.com/cipherunits/CipherLogger/issues) — see the [Contributing](../index.md) section of the README for the process.
