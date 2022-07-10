#!/usr/bin/env zx

cd(process.env.INIT_CWD);

await $`rm -rf node_modules`;
await $`rm -rf dist`;
