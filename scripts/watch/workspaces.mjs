#!/usr/bin/env zx
const tsc = await $`yarn bin tsc`;

await $`${tsc} --watch`;
