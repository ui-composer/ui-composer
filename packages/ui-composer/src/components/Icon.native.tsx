import React, { memo } from 'react';

import { ThemableTokens, theme } from '../theme';

import { TextBase, TextBaseProps } from './Text.native';

export type IconProps = TextBaseProps & {
  /** @default base */
  variant?: ThemableTokens['iconVariant'];
};

export const Icon = memo(function Text({
  variant = 'base',
  fontSize = theme.config.icon[variant].fontSize,
  fontFamily = theme.config.icon[variant].fontFamily,
  ...props
}: IconProps) {
  return (
    <TextBase
      fontSize={fontSize}
      dangerouslySetLineHeight={fontSize}
      fontFamily={fontFamily}
      {...props}
    />
  );
});

Icon.displayName = 'Icon';
