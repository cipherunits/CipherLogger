import { defineConfig } from "tsup";

const peerExternals = [
  "express",
  "next",
  "next/server",
  "fastify",
  "hono",
  "nuxt",
  "@nestjs/common",
  "@nestjs/core",
];

export default defineConfig({
  format: ["cjs", "esm"],
  entry: {
    index: "./src/index.ts",
    express: "./src/express.ts",
    next: "./src/next.ts",
    nuxt: "./src/nuxt.ts",
    fastify: "./src/fastify.ts",
    nest: "./src/nest.ts",
    hono: "./src/hono.ts",
  },
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  external: peerExternals,
  tsconfig: "./tsconfig.json",
});
