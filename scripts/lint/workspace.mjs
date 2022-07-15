#!/usr/bin/env zx

const eslint = await $`yarn bin eslint`;

cd(process.env.INIT_CWD);

await $`yarn exec ${eslint} . --config .eslintrc.js`;
