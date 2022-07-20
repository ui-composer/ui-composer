import { Command, Flags } from '@oclif/core';
import { oneLine } from 'common-tags';
import fs from 'fs';
import path from 'path';
import { webfont } from 'webfont';

export default class IconsConvert extends Command {
  static id = 'icons:convert';
  static description =
    'Convert svg icons to icon font, generate typescript types and write to disk';

  static args = [
    {
      name: 'src',
      description: 'List of glob paths to convert (comma separated)',
      default: 'src/icons/**/*.svg',
    },
  ];

  static flags = {
    cwd: Flags.string({
      description: 'Current working directory',
      default: process.env.INIT_CWD ?? process.cwd(),
      defaultHelp: 'process.env.INIT_CWD or process.cwd()',
    }),
    dest: Flags.string({
      char: 'd',
      description: 'Destination for generated font files',
      default: 'src/icons',
      required: true,
    }),
    fontName: Flags.string({
      description: 'The font family name of the generated font',
      required: true,
    }),
    fontHeight: Flags.integer({
      description: 'The font height of the generated font',
      default: 4096,
    }),
    format: Flags.string({
      description: 'Format of the output (comma separated)',
      options: ['woff', 'woff2', 'ttf', 'svg', 'eot'],
      multiple: true,
      default: 'ttf',
    }),
    startUnicode: Flags.integer({
      description: 'The start unicode of the generated font',
      default: 0xf000,
    }),
    normalize: Flags.boolean({
      description: 'Normalize icons by scaling them to the height of the highest icon.',
    }),
    'skip-types': Flags.boolean({
      description: 'Generate Typescript types for the icons',
      default: false,
    }),
  };

  async run() {
    const { args, flags } = await this.parse(IconsConvert);
    const destDir = path.join(flags.cwd, flags.dest);
    const promises = [];

    const font = await webfont({
      centerHorizontally: true,
      files: path.join(flags.cwd, args.src),
      fontHeight: flags.fontHeight,
      fontName: flags.fontName,
      formats: flags.format.trim().split(','),
      normalize: flags.normalize,
      startUnicode: flags.startUnicode,
    }).catch(err => {
      throw err;
    });

    const names = font.glyphsData.map(glyph => glyph.metadata.name);

    console.log({ args, flags, destDir, names });

    function writeFontFiles() {
      const formats = flags.format.trim().split(',');
      for (const format of formats) {
        promises.push(
          fs.promises.writeFile(path.join(destDir, `${flags.fontName}.${format}`), font[format])
        );
      }
    }

    function writeGlyphMap() {
      const glyphMapDest = path.join(destDir, 'glyphMap.ts');
      const entry = fs.createWriteStream(glyphMapDest);
      entry.write(`export const glyphMap = {
      `);
      for (const { metadata } of font.glyphsData) {
        console.log(metadata);
        const unicode = metadata.unicode[0];
        entry.write(`'${metadata.name}': '${unicode}',
        `);
      }
      entry.write(`};`);
      entry.end();
    }

    async function writeTypescriptFile() {
      const content = oneLine`export type IconName = ${names
        .map(name => String.raw`'${name}'`)
        .join(' | ')};`;

      const typesDest = path.join(destDir, 'types/IconName.ts');

      if (!fs.existsSync(typesDest)) {
        fs.mkdirSync(path.dirname(typesDest), { recursive: true });
      }

      console.log({
        typesDest,
        content,
      });

      promises.push(fs.promises.writeFile(typesDest, content, 'utf-8'));
    }

    writeFontFiles();
    writeGlyphMap();

    if (!flags['skip-types']) {
      writeTypescriptFile();
    }

    await Promise.all(promises);
  }
}
