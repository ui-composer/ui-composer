#!/usr/bin/env zx

import path from 'path';
import styleDictionaryPackage from 'style-dictionary';

const tokenTransformer = await $`yarn bin token-transformer`;

/**
 *  Converts tokens from Figma Tokens to something Style Dictionary can read, removing any math operations or aliases, only resulting in raw values.
 * @link https://github.com/six7/figma-tokens/tree/main/token-transformer
 */
async function transformToken({ source, destination, setsToInclude, setsToExclude }) {
  const includedSets = setsToInclude ? setsToInclude.join(',') : '';
  const excludedSets = setsToExclude ? setsToExclude.join(',') : '';
  return await $`${tokenTransformer} ${source} ${destination} ${includedSets} ${excludedSets}`;
}

await Promise.all(
  fs
    .readdirSync('src', { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(async ({ name }) => {
      const figmaTokensSrcPath = `generated/${name}/figma-tokens/data.json`;
      /**
       * This is what is consumed by figma-tokens plugin
       */
      await transformToken({
        source: `src/${name}`,
        destination: figmaTokensSrcPath,
      });

      const files = await glob([`src/${name}/**/*.json`]);

      await Promise.all(
        files.map(async file => {
          const groupName = path.basename(file, path.extname(file)); // light, dark, normal, dense, global
          const styleDictionarySrcPath = `generated/${name}/style-dictionary/${groupName}.json`;

          await transformToken({
            source: figmaTokensSrcPath,
            destination: styleDictionarySrcPath,
            setsToInclude: [groupName],
          });

          styleDictionaryPackage
            .extend({
              source: [styleDictionarySrcPath],
              platforms: {
                css: {
                  transformGroup: 'css',
                  files: [
                    {
                      destination: `generated/${name}/tokens/${groupName}.css`,
                      format: 'css/variables',
                      options: {
                        selector: `.${name}-${groupName}`,
                        outputReferences: true,
                      },
                    },
                  ],
                },
              },
            })
            .buildAllPlatforms();
        })
      );
    })
);
