# Roadmap

CipherLogger is under active development. This page tracks what's planned so you can decide whether to wait for a feature or work around it today.

## Framework adapters

| Framework | Status |
| --------- | ------ |
| Express   | :material-check-circle:{ style="color: #4caf50" } Stable |
| Next.js   | :material-check-circle:{ style="color: #4caf50" } Stable — middleware + [`withCipherLogger`](../guide/nextjs.md#accurate-route-handler-logging) |
| Fastify   | :material-check-circle:{ style="color: #4caf50" } Available (`cipher-logger/fastify`) |
| Hono      | :material-check-circle:{ style="color: #4caf50" } Available (`cipher-logger/hono`) |
| NestJS    | :material-check-circle:{ style="color: #4caf50" } Available — Express-compatible middleware (`cipher-logger/nest`) |
| Nuxt      | :material-check-circle:{ style="color: #4caf50" } Available — Node-style middleware (`cipher-logger/nuxt`) |

## Package structure

Core and adapters live under `src/core/` and `src/adapters/`. Subpath exports (`cipher-logger/express`, `cipher-logger/next`, …) keep peer framework code out of the main entry until you import (or call) that adapter.

## Contributing to the roadmap

Have a framework you'd like supported, or a field you think should be built in? Open an issue on [GitHub](https://github.com/cipherunits/CipherLogger/issues).
