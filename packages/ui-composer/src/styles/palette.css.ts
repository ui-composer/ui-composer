import { createTheme } from '@vanilla-extract/css';

import colors from './colors.css';

const light = {
  foreground: colors.light.vars.gray100,
  foregroundMuted: colors.light.vars.gray60,
  background: colors.light.vars.gray0,
  backgroundAlternate: colors.light.vars.gray5,
  backgroundOverlay: `${colors.light.vars.gray80}, 0.33`,
  line: `${colors.light.vars.gray60}, 0.2`,
  lineHeavy: `${colors.light.vars.gray60}, 0.66`,
  lineMuted: `${colors.light.vars.gray50}, 0.2`,
  primary: colors.light.vars.blue60,
  primaryMuted: colors.light.vars.blue0,
  primaryForeground: colors.light.vars.gray0,
  negative: colors.light.vars.red60,
  negativeForeground: colors.light.vars.gray0,
  negativeMuted: colors.light.vars.red0,
  positive: colors.light.vars.green60,
  positiveForeground: colors.light.vars.gray0,
  positiveMuted: colors.light.vars.green0,
  secondary: colors.light.vars.gray5,
  secondaryForeground: colors.light.vars.gray100,
};

const dark = {
  foreground: colors.dark.vars.gray100,
  foregroundMuted: colors.dark.vars.gray60,
  background: colors.dark.vars.gray0,
  backgroundAlternate: colors.dark.vars.gray5,
  backgroundOverlay: `${colors.dark.vars.gray0}, 0.5`,
  line: `${colors.dark.vars.gray60}, 0.2`,
  lineHeavy: `${colors.dark.vars.gray60}, 0.66`,
  lineMuted: `${colors.dark.vars.gray50}, 0.2`,
  primary: colors.dark.vars.blue60,
  primaryMuted: colors.dark.vars.blue0,
  primaryForeground: colors.dark.vars.gray0,
  negative: colors.dark.vars.red60,
  negativeForeground: colors.dark.vars.gray0,
  negativeMuted: colors.dark.vars.red0,
  positive: colors.dark.vars.green60,
  positiveForeground: colors.dark.vars.gray0,
  positiveMuted: colors.dark.vars.green0,
  secondary: colors.dark.vars.gray20,
  secondaryForeground: colors.dark.vars.gray10,
};

const lightPalette = createTheme(light);
const darkPalette = createTheme(dark);

export default {
  light: {
    className: lightPalette[0],
    vars: lightPalette[1],
  },
  dark: {
    className: darkPalette[0],
    vars: darkPalette[1],
  },
};

// black: 'rgb(10, 11, 13)',
// white: 'white',
// transparent: 'transparent',
