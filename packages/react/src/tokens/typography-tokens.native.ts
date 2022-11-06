import type { TypographyConfig } from '@ui-composer/theme';

import { typographyShared } from './typography-tokens-shared';

function transformVariants(variants: TypographyConfig['variants']) {
  const fontWeightMap = {
    400: 'Regular',
    500: 'Medium',
    600: 'Semi-Bold',
  };

  const modifiedEntries = Object.entries(variants).map(
    ([key, { fontWeight = 400, ...variant }]) => {
      return [
        key,
        { ...variant, fontFamily: `${variant.fontFamily}-${fontWeightMap[fontWeight]}` },
      ];
    }
  );
  return Object.fromEntries(modifiedEntries);
}

export const typography: TypographyConfig = {
  ...typographyShared,
  variants: transformVariants(typographyShared.variants),
};
