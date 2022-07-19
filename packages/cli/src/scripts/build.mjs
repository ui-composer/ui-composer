#!/usr/bin/env zx

import esbuild from 'esbuild';
import { argv, glob } from 'zx';

export async function build() {
  const { cwd = process.env.INIT_CWD, watch } = argv ?? {};

  const files = await glob(
    [
      'src/**/*.js',
      'src/**/*.mjs',
      'src/**/*.cjs',
      'src/**/*.ts',
      'src/**/*.tsx',
      'src/**/*.json',
      'src/**/*.css',
    ],
    {
      ignore: ['src/**/*.d.ts'],
      cwd,
    }
  );

  if (files) {
    esbuild
      .build({
        absWorkingDir: cwd,
        entryPoints: files,
        format: 'esm',
        outdir: 'dist',
        outbase: 'src',
        watch: Boolean(watch),
      })
      .catch(() => process.exit(1));
  }
}
