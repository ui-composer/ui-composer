#!/usr/bin/env zx

const prettier = await $`yarn bin prettier`;

cd(process.env.INIT_CWD);

const files = await glob(['src/**/*.ts', 'src/**/*.tsx']);

if (files.length > 0) {
  await $`${prettier} ${files}`;
}
