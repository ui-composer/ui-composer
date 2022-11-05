#!/usr/bin/env zx

try {
  await $`vite build`;
  within(async () => {
    await $`yarn workspace ui-composer watch`;
  });
  within(async () => {
    await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js --watch`;
  });
  await $`vite dev`;
} catch (err) {
  process.exit(1);
}
