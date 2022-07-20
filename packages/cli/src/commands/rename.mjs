import { Command, Flags } from '@oclif/core';
import fs from 'fs';
import humps from 'humps';
import path from 'path';
import { glob } from 'zx';

/** @param {string} str */
function camelCase(str) {
  return humps.camelize(str);
}

/** @param {string} str */
function pascalCase(str) {
  return humps.pascalize(str);
}

/** @param {string} str */
function kebabCase(str) {
  return humps.decamelize(str, { separator: '-' });
}

/** @param {string} str */
function snakeCase(str) {
  return humps.decamelize(str, { separator: '_' });
}

const formatters = {
  camelCase,
  'kebab-case': kebabCase,
  'Pascal Case': pascalCase,
  snake_case: snakeCase,
};

export default class Rename extends Command {
  static id = 'rename';
  static description = 'Rename files via cli';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static args = [{ name: 'src', description: 'List of glob path(s) to rename', required: true }];

  static flags = {
    cwd: Flags.string({
      description: 'Current working directory',
      default: process.env.INIT_CWD ?? process.cwd(),
      defaultHelp: 'process.env.INIT_CWD or process.cwd()',
    }),
    output: Flags.string({
      description: 'Destination for renamed files',
      defaultHelp: '[SRC]/[NAME].[EXT]',
    }),
    ignore: Flags.string({
      description: 'List of glob paths to **not** rename. (comma separated)',
    }),
    format: Flags.string({
      description: 'Format the final output after any replacements',
      options: ['camelCase', 'kebab-case', 'snake_case', 'Pascal Case'],
      default: 'kebab-case',
    }),
    sequential: Flags.boolean({
      description: 'Append numbers to the end of the file name after any replacements',
      default: false,
    }),
    replace: Flags.string({
      description: 'Replace a string in the file name. ',
      defaultHelp: 'replace-me=replacement',
    }),
  };

  async run() {
    const { args, flags } = await this.parse(Rename);
    const files = await glob(args.src, {
      cwd: flags.cwd,
      absolute: true,
    });

    const renamedFiles = [];

    /** @returns {Promise<string>[]} */
    const promises = [];

    /**
     *
     * @param {string} file
     * @param {number} fileNumber
     */
    async function rename(file, fileNumber) {
      const dir = path.dirname(file);
      const basename = path.basename(file);
      const ext = path.extname(basename);
      let name = basename.replace(ext, '');
      let newFile = file;

      if (flags.replace) {
        const [input, replacement = ''] = flags.replace.split('=');
        name = name.replace(input, replacement);
      }

      if (flags.sequential && typeof fileNumber === 'number') {
        name = `${name}-${fileNumber}`;
      }

      if (flags.format) {
        name = formatters[flags.format](name);
        newFile = path.join(dir, `${name}${ext}`);
        renamedFiles.push(newFile);
      }

      promises.push(fs.promises.rename(file, newFile));
    }

    function renameSequentially() {
      return files.reduce(
        /**
         * @param {[string, number][]} prev
         * @param {string} next
         * @returns {[string, number][]}
         */
        (prev, next) => {
          /** @type {[string, number]} */
          const lastNumber = prev[prev.length - 1] ?? ['', 0];
          const fileNumber = lastNumber[1] + 1;
          rename(next, fileNumber);
          return [...prev, [next, fileNumber]];
        },
        []
      );
    }

    if (files) {
      if (flags.sequential) {
        renameSequentially();
      } else {
        files.forEach(rename);
      }

      await Promise.all(promises);
      console.log(renamedFiles);
    }
  }
}
