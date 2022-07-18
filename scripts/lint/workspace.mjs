#!/usr/bin/env zx

const eslint = await $`yarn bin eslint`;

cd(process.env.INIT_CWD);
const config = argv.config ?? '.eslintrc.js';

await $`yarn exec ${eslint} . --config ${config} --max-warnings 0`;
