const lightWashes = {
  negativeWash: 'red10',
  negativeWashForeground: 'gray0',
  primaryWash: 'blue0',
  primaryWashForeground: 'gray0',
  positiveWash: 'green5',
  positiveWashForeground: 'gray100',
  warningWash: 'yellow5',
  warningWashForeground: 'gray100',
} as const;

export const light = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  warning: 'yellow10',
  warningForeground: 'gray100',
  secondary: 'gray5',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
  elevation1: 'gray0',
  elevation2: 'gray0',
  ...lightWashes,
} as const;

export const dark = {
  ...light,
  secondary: 'gray20',
  backgroundOverlay: ['gray0', 0.5],
  elevation1: 'gray5',
  elevation2: 'gray10',
} as const;
