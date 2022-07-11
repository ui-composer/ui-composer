#!/usr/bin/env zx

import path from 'path';
import styleDictionaryPackage from 'style-dictionary';

const tokenTransformer = await $`yarn bin token-transformer`;

/**
 *  Converts tokens from Figma Tokens to something Style Dictionary can read, removing any math operations or aliases, only resulting in raw values.
 * @link https://github.com/six7/figma-tokens/tree/main/token-transformer
 */
async function transformToken({
  source,
  destination,
  setsToInclude,
  setsToExclude,
  /** enable/disable resolving references, removing any aliases or math expressions */
  outputReferences,
}) {
  const includedSets = setsToInclude ? setsToInclude.join(',') : '';
  const excludedSets = setsToExclude ? setsToExclude.join(',') : '';
  return await $`${tokenTransformer} ${source} ${destination} ${includedSets} ${excludedSets} --resolveReferences ${outputReferences}`;
}

await Promise.all(
  fs
    .readdirSync('src', { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(async ({ name }) => {
      const figmaTokensMergedSrcPath = `generated/${name}/figma-tokens/data.json`;
      /**
       * This is what is consumed by figma-tokens plugin
       */
      await transformToken({
        source: `src/${name}`,
        destination: figmaTokensMergedSrcPath,
        outputReferences: true,
      });

      const files = await glob([`src/${name}/**/*.json`]);

      await Promise.all(
        files.map(async file => {
          const groupName = path.basename(file, path.extname(file)); // light, dark, normal, dense, global
          const styleDictionarySrcPath = `generated/${name}/style-dictionary/${groupName}.json`;

          await transformToken({
            source: figmaTokensMergedSrcPath,
            destination: styleDictionarySrcPath,
            setsToInclude: [groupName],
            outputReferences: false,
          });

          styleDictionaryPackage
            .registerTransform({
              name: 'size/css-px', // notice: the name is an override of an existing predefined method (yes, you can do it)
              type: 'value',
              matcher(token) {
                // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
                return ['spacing', 'sizing', 'lineHeights', 'fontSizes'].includes(token.type);
              },
              transformer(token) {
                return `${token.original.value}px`;
              },
            })
            .registerTransformGroup({
              name: 'css',
              transforms: [
                ...require('style-dictionary/lib/common/transformGroups').css,
                'size/css-px',
              ],
            })
            .extend({
              source: [styleDictionarySrcPath],
              platforms: {
                css: {
                  transformGroup: 'css',
                  files: [
                    {
                      destination: `generated/${name}/tokens/${groupName}.css`,
                      format: 'css/variables',
                      filter(token) {
                        if (token.type === 'typography') {
                          console.log(token);
                        }
                        return token.type !== 'typography';
                      },
                      options: {
                        showFileHeader: false,
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
