import { createRequire } from "node:module";
import { join } from "node:path";

// Resolve sibling adapter chunks from the built `dist/` directory at runtime.
// Using createRequire + __dirname avoids esbuild rewriting `require("./" + id)`
// into an in-bundle glob that cannot see separate entry files.
const requireFromDist = createRequire(__filename);

export function loadAdapter<T>(id: string): T {
  return requireFromDist(join(__dirname, `${id}.js`)) as T;
}
