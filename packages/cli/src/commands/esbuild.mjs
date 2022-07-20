import { Command } from '@oclif/core';
import { $ } from 'zx';

import { BUILD_FLAGS } from '../configs.mjs';

export default class Build extends Command {
  static id = 'build';
  static description = 'Build project with ESBuild';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = BUILD_FLAGS;

  async run() {
    const esbuildPath = new URL('../scripts/esbuild.mjs', import.meta.url);
    $.verbose = false;
    $`zx ${esbuildPath} ${process.argv}`;
  }
}
