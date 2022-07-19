import { Command, Flags } from '@oclif/core';
import esbuild from 'esbuild';
import path from 'path';
import { glob } from 'zx';

export const DEFAULT_INCLUDE = '**/*.{js,mjs,cjs,ts,tsx,json,css}';
export const DEFAULT_IGNORE = '**/*.d.ts';

export default class Build extends Command {
  static id = 'build';
  static description = 'Build project with ESBuild';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    cwd: Flags.string({
      description: 'Current working directory',
      default: process.env.INIT_CWD,
      defaultHelp: 'process.env.INIT_CWD or process.cwd()',
    }),
    /** @return {import('@oclif/core/lib/interfaces').OptionFlag<import('esbuild').Format>} */
    format: Flags.string({
      description: 'Format of the output',
      default: 'cjs',
    }),
    include: Flags.string({
      description: 'List of glob paths to compile. (comma separated)',
      default: DEFAULT_INCLUDE,
    }),
    ignore: Flags.string({
      description: 'List of glob paths to **not** compile. (comma separated)',
      default: DEFAULT_IGNORE,
    }),
    'out-dir': Flags.string({
      description: 'd',
      default: 'dist',
    }),
    'out-extension': Flags.string({
      description:
        'Customize the file extension of the files that esbuild generates to something other than .js or .css. This option is useful if you are using esbuild to generate multiple files and you have to use the outdir option instead of the outfile option [link](https://esbuild.github.io/api/#out-extension)',
      default: 'js',
    }),
    'delete-dir-on-start': Flags.boolean({
      description: 'Delete the out directory before compilation',
      default: false,
    }),
    watch: Flags.boolean({
      description: 'Watch for changes and rebuild',
      default: false,
    }),
  };

  static args = [{ name: 'src', description: 'source directory to run build on', default: 'src' }];

  async run() {
    const { args, flags } = await this.parse(Build);
    const files = await glob(flags.include, {
      ignore: [flags.ignore],
      cwd: path.join(flags.cwd, args.src),
      absolute: true,
    });
    console.log(flags, files);

    if (files) {
      esbuild
        .build({
          absWorkingDir: flags.cwd,
          entryPoints: files,
          // @ts-expect-error - couldn't figure out correct jsdoc types in static flags
          format: flags.format,
          outdir: flags['out-dir'],
          outbase: args.src,
          watch: flags.watch,
        })
        .catch(() => process.exit(1));
    }
  }
}
