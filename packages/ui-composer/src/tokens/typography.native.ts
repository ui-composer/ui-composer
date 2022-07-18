import type { TypographyConfig } from '../types/typography';
import { mapValues } from '../utils/object';

import { typographyShared } from './typography-shared';

const fontWeightMap = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semi-Bold',
};

export const typography: TypographyConfig = mapValues(typographyShared, val => {
  return {
    ...val,
    fontFamily: `${val.fontFamily}-${fontWeightMap[val.fontWeight]}`,
  };
});
