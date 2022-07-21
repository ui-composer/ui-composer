import type { TypographyConfig } from '../types/typography';
import { mapValues } from '../utils/object';

import { typographyShared } from './typography-shared';

function transformVariants(variants: TypographyConfig['variants']) {
  const fontWeightMap = {
    400: 'Regular',
    500: 'Medium',
    600: 'Semi-Bold',
  };
  return mapValues(variants, ({ fontWeight = 400, ...variant }) => {
    return {
      ...variant,
      fontFamily: `${variant.fontFamily}-${fontWeightMap[fontWeight]}`,
    };
  });
}

export const typography: TypographyConfig = {
  ...typographyShared,
  variants: transformVariants(typographyShared.variants),
};
