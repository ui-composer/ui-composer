import { Flags } from '@oclif/core';

export const BUILD_FLAGS = {
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
    default: 'esm',
  }),
  files: Flags.string({
    description: 'List of glob paths to compile. (comma separated)',
    default: '**/*.{js,mjs,cjs,ts,tsx}',
  }),
  ignore: Flags.string({
    description: 'List of glob paths to **not** compile. (comma separated)',
    default: '**/*.d.ts',
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
