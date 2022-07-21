export const light = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray5',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
  elevation1: 'gray0',
  elevation2: 'gray0',
} as const;

export const dark = {
  ...light,
  secondary: 'gray20',
  backgroundOverlay: ['gray0', 0.5],
  elevation1: 'gray5',
  elevation2: 'gray10',
} as const;
