#!/usr/bin/env zx
import esbuild from 'esbuild';
import path from 'path';
import { argv, fs, glob } from 'zx';

import { BUILD_FLAGS } from '../configs.mjs';

const {
  dest = BUILD_FLAGS.dest.default,
  src = BUILD_FLAGS.src.default,
  files = BUILD_FLAGS.files.default,
  ignore = BUILD_FLAGS.ignore.default,
  cwd = BUILD_FLAGS.cwd.default,
  format = BUILD_FLAGS.format.default,
  watch = BUILD_FLAGS.watch.default,
} = argv;

const deleteDirOnStart = argv['delete-dir-on-start'] ?? BUILD_FLAGS['delete-dir-on-start'].default;

if (deleteDirOnStart && fs.existsSync(dest)) {
  await fs.promises.rm(dest, { recursive: true });
}

const entryPoints = await glob(path.join(src, files), {
  ignore: [ignore],
  cwd: path.join(cwd),
  absolute: true,
});

if (files) {
  esbuild
    .build({
      absWorkingDir: cwd,
      entryPoints,
      format,
      outdir: dest,
      outbase: src,
      watch,
      loader: {
        '.svg': 'copy',
        '.ttf': 'copy',
        '.woff': 'copy',
        '.woff2': 'copy',
        '.eot': 'copy',
        '.otf': 'copy',
      },
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}
