import React, { memo } from 'react';

import { ThemableTokens, theme } from '../theme';
import { IconName } from '../types';

import { TextBase, TextBaseProps } from './Text.native';

export type IconProps = TextBaseProps & {
  /** @default base */
  variant?: ThemableTokens['iconVariant'];
  name: IconName;
};

export const Icon = memo(function Text({
  variant = 'base',
  fontSize = theme.config.icon.variants[variant].fontSize,
  fontFamily = theme.config.icon.variants[variant].fontFamily,
  name,
  ...props
}: IconProps) {
  return (
    <TextBase
      width={fontSize}
      height={fontSize}
      maxWidth={fontSize}
      maxHeight={fontSize}
      fontSize={fontSize}
      dangerouslySetLineHeight={fontSize}
      fontFamily={fontFamily}
      {...props}
    >
      {name}
    </TextBase>
  );
});

Icon.displayName = 'Icon';
