# Installation

## Package manager

=== "npm"

    ```bash
    npm install cipher-logger
    ```

=== "pnpm"

    ```bash
    pnpm add cipher-logger
    ```

=== "yarn"

    ```bash
    yarn add cipher-logger
    ```

## Peer dependencies

CipherLogger only requires the framework you actually use — everything else stays out of your `node_modules`.

=== "Express"

    ```bash
    npm install express
    ```

=== "Next.js"

    ```bash
    npm install next
    ```

If you only use the framework-agnostic [`Logger`](../reference/api.md#logger) class, no peer dependency is required at all.

## Requirements

| Requirement | Version |
| ----------- | ------- |
| Node.js     | 18 or later |
| TypeScript  | 5.x (optional — CipherLogger ships its own `.d.ts` files) |
| Module system | ESM and CommonJS both supported |

## Verifying the install

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger();
cipher.logRequest({ method: "GET", path: "/health", status: 200, duration: 1 });
```

If this prints a formatted `HTTP Request` log line to your console, you're set. Continue to the [Quick Start](quick-start.md).
