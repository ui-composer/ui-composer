import type { PaletteAlias } from './palette';

export type ColorMode = 'dark' | 'light';
export type ColorHue =
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'red';
export type ColorTint =
  | '0'
  | '5'
  | '10'
  | '15'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100';
export type Color = `${ColorHue}${ColorTint}`;

export type ColorModeThemeConfig = {
  [key in 'color']: Record<PaletteAlias, Color>;
};
