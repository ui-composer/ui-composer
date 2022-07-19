#!/usr/bin/env zx

import { $, argv, cd } from 'zx';

export async function clean() {
  const { cwd = process.env.INIT_CWD, dirs = 'node_modules,dist' } = argv;
  cd(cwd);

  await Promise.all(
    dirs
      .trim()
      .split(',')
      .map(dir => $`rm -rf ${dir}`)
  );
}
