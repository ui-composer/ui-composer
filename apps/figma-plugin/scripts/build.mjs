#!/usr/bin/env zx

try {
  await $`vite build`;
  await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js`;
} catch (err) {
  process.exit(1);
}
