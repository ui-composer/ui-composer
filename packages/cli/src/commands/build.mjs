import { Command, Flags } from '@oclif/core';
import esbuild from 'esbuild';
import path from 'path';
import { fs, glob } from 'zx';

export const DEFAULT_INCLUDE =
  '**/*.{js,mjs,cjs,ts,tsx,json,css,svg,woff,woff2,eot,ttf,otf,png,jpg,jpeg,gif}';
export const DEFAULT_IGNORE = '**/*.d.ts';

export default class Build extends Command {
  static id = 'build';
  static description = 'Build project with ESBuild';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static args = [{ name: 'src', description: 'Source directory to run build on', default: 'src' }];

  static flags = {
    cwd: Flags.string({
      description: 'Current working directory',
      default: process.env.INIT_CWD,
      defaultHelp: 'process.env.INIT_CWD or process.cwd()',
    }),
    src: Flags.string({
      description: 'Directory to target for build',
      default: 'src',
    }),
    /** @return {import('@oclif/core/lib/interfaces').OptionFlag<import('esbuild').Format>} */
    format: Flags.string({
      description: 'Format of the output',
      default: 'cjs',
    }),
    files: Flags.string({
      description: 'List of glob paths to compile. (comma separated)',
      default: DEFAULT_INCLUDE,
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
    'out-extension': Flags.string({
      description:
        'Customize the file extension of the files that esbuild generates to something other than .js or .css. This option is useful if you are using esbuild to generate multiple files and you have to use the outdir option instead of the outfile option [link](https://esbuild.github.io/api/#out-extension)',
      default: 'js',
    }),
    'delete-dir-on-start': Flags.boolean({
      description: 'Delete the dest directory before compilation',
      default: true,
    }),
    watch: Flags.boolean({
      description: 'Watch for changes and rebuild',
      default: false,
    }),
  };

  async run() {
    const { args, flags } = await this.parse(Build);
    if (flags['delete-dir-on-start'] && fs.existsSync(flags.dest)) {
      await fs.promises.rm(flags.dest, { recursive: true });
    }
    const files = await glob(path.join(flags.src, flags.files), {
      ignore: [flags.ignore],
      cwd: path.join(flags.cwd),
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
          loader: {
            '.svg': 'copy',
            '.ttf': 'copy',
            '.woff': 'copy',
            '.woff2': 'copy',
            '.eot': 'copy',
            '.otf': 'copy',
          },
        })
        .catch(() => process.exit(1));
    }
  }
}
