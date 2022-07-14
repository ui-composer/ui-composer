import { light as colors } from './tokens/colors';
import { light as palette } from './tokens/palette';
import createTheme from './createTheme';

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

const typography = {
  display1: { fontSize: 64, lineHeight: 72, fontFamily: 'CoinbaseDisplay', fontWeight: 400 },
  display2: { fontSize: 48, lineHeight: 56, fontFamily: 'CoinbaseDisplay', fontWeight: 400 },
  display3: { fontSize: 40, lineHeight: 48, fontFamily: 'CoinbaseDisplay', fontWeight: 400 },
  title1: { fontSize: 28, lineHeight: 36, fontFamily: 'CoinbaseDisplay', fontWeight: 500 },
  title2: { fontSize: 28, lineHeight: 36, fontFamily: 'CoinbaseDisplay', fontWeight: 400 },
  title3: { fontSize: 20, lineHeight: 28, fontFamily: 'CoinbaseSans', fontWeight: 500 },
  title4: { fontSize: 20, lineHeight: 28, fontFamily: 'CoinbaseSans', fontWeight: 400 },
  headline: { fontSize: 16, lineHeight: 24, fontFamily: 'CoinbaseSans', fontWeight: 500 },
  body: { fontSize: 16, lineHeight: 24, fontFamily: 'CoinbaseSans', fontWeight: 400 },
  label1: { fontSize: 14, lineHeight: 20, fontFamily: 'CoinbaseSans', fontWeight: 500 },
  label2: { fontSize: 14, lineHeight: 20, fontFamily: 'CoinbaseSans', fontWeight: 400 },
  caption: { fontSize: 13, lineHeight: 16, fontFamily: 'CoinbaseText', fontWeight: 500 },
  legal: { fontSize: 13, lineHeight: 16, fontFamily: 'CoinbaseText', fontWeight: 400 },
};

const theme = createTheme({
  borderRadius,
  colors,
  palette,
  spacing,
  typography,
});

export type ThemableTokens = typeof theme.types.tokens;
export type ThemeableProps = typeof theme.types.props;

export const compose = theme.compose;
