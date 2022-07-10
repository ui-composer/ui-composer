#!/usr/bin/env zx

const eslint = await $`yarn bin eslint`;

cd(process.env.INIT_CWD);

await $`${eslint} src --ext ts,tsx,js --fix`;
