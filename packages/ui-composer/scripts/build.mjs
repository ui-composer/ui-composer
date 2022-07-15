#!/usr/bin/env zx
import esbuild from 'esbuild';

cd(process.env.INIT_CWD);

const files = await glob(['src/**/*.ts', 'src/**/*.tsx']);

export function build({ watch = false } = {}) {
  esbuild
    .build({
      absWorkingDir: process.env.INIT_CWD,
      entryPoints: files,
      format: 'esm',
      outdir: 'dist',
      outbase: 'src',
      watch,
    })
    .catch(() => process.exit(1));
}

if (files.length > 0) {
  build();
}
