import React, { memo } from 'react';
import { Animated } from 'react-native';

import { compose, theme } from '../theme';

const variants = theme.config.typography.variants;

/**
 * @note fontWeight font-weight is configured via font file in react native
 */
export type TextBaseProps = Omit<React.ComponentProps<typeof TextBase>, 'fontWeight'>;
export type TextVariant = Extract<keyof typeof variants, string>;
export type TextProps = TextBaseProps & {
  /** @default body */
  variant?: TextVariant;
};

export const TextBase = compose(Animated.Text);

export const Text = memo(function Text({
  variant = 'body',
  fontFamily = variants[variant].fontFamily,
  fontSize = variants[variant].fontSize,
  lineHeight = variants[variant].lineHeight,
  ...props
}: TextProps) {
  return (
    <TextBase fontFamily={fontFamily} fontSize={fontSize} lineHeight={lineHeight} {...props} />
  );
});

TextBase.displayName = 'TextBase';
Text.displayName = 'Text';
