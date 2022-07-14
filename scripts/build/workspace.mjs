#!/usr/bin/env zx

import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import autoprefixer from 'autoprefixer';
import esbuild from 'esbuild';
import postcss from 'postcss';

cd(process.env.INIT_CWD);

await $`rm -rf dist`;

const files = await glob(['src/**/*.ts', 'src/**/*.tsx']);

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */,
  });
  return result.css;
}

if (files.length > 0) {
  console.log(files);
  esbuild
    .build({
      absWorkingDir: process.env.INIT_CWD,
      entryPoints: files,
      format: 'cjs',
      plugins: [
        vanillaExtractPlugin({
          processCss,
        }),
      ],
      outdir: 'dist',
      outbase: 'src',
      watch: Boolean(process.env.WATCH),
    })
    .catch(() => process.exit(1));
}
