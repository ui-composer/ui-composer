#!/usr/bin/env zx

cd(process.env.INIT_CWD);

await $`rm -rf dist`;

await $`WATCH=1 yarn build`;
