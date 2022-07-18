import React, { memo } from 'react';
import { Animated } from 'react-native';

import { compose, theme } from '../theme';
import type { TypographyConfigurableValues } from '../types/typography';

export type ThemeableTextProps = Omit<React.ComponentProps<typeof ThemeableText>, 'fontWeight'>;
export const ThemeableText = compose(Animated.Text);
ThemeableText.displayName = 'ThemeableText';

export type TextProps = Omit<ThemeableTextProps, keyof TypographyConfigurableValues> & {
  variant: typeof theme.types.tokens.typography;
};

export const Text = memo(function Text({ variant, ...props }: TextProps) {
  return <ThemeableText fontFamily={variant} fontSize={variant} lineHeight={variant} {...props} />;
});

Text.displayName = 'Text';
