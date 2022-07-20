import { light as colors } from './tokens/color';
import { icon } from './tokens/icon';
import { light as palette } from './tokens/palette';
import { typography } from './tokens/typography';
import { createTheme } from './createTheme';

const borderRadius = {
  roundedNone: 0,
  roundedSmall: 4,
  rounded: 8,
  roundedLarge: 16,
  roundedFull: 1000,
};

const spacing = {
  0: 0,
  0.5: 4,
  1: 8,
  2: 12,
  3: 16,
  4: 20,
  5: 24,
  6: 28,
  7: 32,
  8: 36,
  9: 40,
  10: 44,
} as const;

export const theme = createTheme({
  borderRadius,
  colors,
  icon,
  palette,
  spacing,
  typography,
});

export type ThemableTokens = typeof theme.types.tokens;
export type ThemeableProps = typeof theme.types.props;

export const compose = theme.compose;
