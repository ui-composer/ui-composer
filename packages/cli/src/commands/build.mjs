import { Command, Flags } from '@oclif/core';
import esbuild from 'esbuild';
import { glob } from 'zx';

export const DEFAULT_SRC = 'src/**/*.{js,mjs,cjs,ts,tsx,json,css}';
export const DEFAULT_IGNORE = '**/*.d.ts';

export default class Build extends Command {
  static id = 'build';
  static description = 'Build project with ESBuild';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static args = [
    { name: 'src', description: 'Source directory to run build on', default: DEFAULT_SRC },
  ];

  static flags = {
    cwd: Flags.string({
      description: 'Current working directory',
      default: process.env.INIT_CWD ?? process.cwd(),
      defaultHelp: 'process.env.INIT_CWD or process.cwd()',
    }),
    /** @return {import('@oclif/core/lib/interfaces').OptionFlag<import('esbuild').Format>} */
    format: Flags.string({
      description: 'Format of the output',
      default: 'cjs',
    }),
    ignore: Flags.string({
      description: 'List of glob paths to **not** compile. (comma separated)',
      default: DEFAULT_IGNORE,
    }),
    dest: Flags.string({
      char: 'd',
      description: 'Destination for built files',
      default: 'dist',
    }),
    include: Flags.string({
      description: 'List of extensions to compile. (comma separated)',
      default: 'js,mjs,cjs,ts,tsx,json,css',
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

  async run() {
    const { args, flags } = await this.parse(Build);
    const files = await glob(args.src, {
      ignore: [flags.ignore],
      cwd: flags.cwd,
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
          outdir: flags.dest,
          outbase: args.src,
          watch: flags.watch,
        })
        .catch(() => process.exit(1));
    }
  }
}
