export const button = {
  variants: {
    primary: {
      color: 'primaryForeground',
      backgroundColor: 'primary',
      borderColor: 'transparent',
    },
    secondary: {
      color: 'secondaryForeground',
      backgroundColor: 'secondary',
      borderColor: 'line',
    },
    positive: {
      color: 'positiveForeground',
      backgroundColor: 'positive',
      borderColor: 'transparent',
    },
    negative: {
      color: 'negative',
      backgroundColor: 'background',
      borderColor: 'line',
    },
  },
} as const;
