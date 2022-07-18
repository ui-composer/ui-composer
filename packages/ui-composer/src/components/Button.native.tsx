import React, { memo } from 'react';

import { ThemeableProps } from '../theme';

import { Pressable, PressableProps } from './Pressable.native';
import { Text, TextProps } from './Text.native';

type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'negative';
type ButtonVariantsConfig = Record<ButtonVariant, ThemeableProps>;

const variants: ButtonVariantsConfig = {
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
};

const DEFAULT_SPACING = 4;
const FLUSH_SPACING = 2;
// const iconSpacing = 3;

const COMPACT_PROPS = {
  minHeight: 40,
};

const BLOCK_PROPS = {
  width: '100%',
  maxWidth: '100%',
};

const INLINE_PROPS = {
  minWidth: 64,
  width: 'auto',
};

export type ButtonProps = PressableProps & {
  variant: ButtonVariant;
  /** If present decrease horizontal padding */
  flush?: boolean;
  compact?: boolean;
  inline?: boolean;
  _textProps?: TextProps;
};

export const Button = memo(function Button({
  _textProps,
  compact,
  flush,
  inline,
  variant,
  block = !inline,
  width = block ? BLOCK_PROPS.width : 'auto',
  minWidth = inline ? INLINE_PROPS.minWidth : undefined,
  maxWidth = block ? BLOCK_PROPS.maxWidth : undefined,
  minHeight = compact ? COMPACT_PROPS.minHeight : 56,
  justifyContent = flush ? 'flex-start' : 'center',
  offsetHorizontal = flush ? FLUSH_SPACING : undefined,
  spacingStart = flush ? FLUSH_SPACING : DEFAULT_SPACING,
  spacingEnd = flush ? FLUSH_SPACING : DEFAULT_SPACING,
  feedback = compact ? 'light' : 'normal',
  ...props
}: ButtonProps) {
  return (
    <Pressable
      flexDirection="row"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent={justifyContent}
      backgroundColor={variants[variant].backgroundColor}
      borderColor={variants[variant].borderColor}
      borderWidth={1}
      spacingStart={spacingStart}
      spacingEnd={spacingEnd}
      offsetHorizontal={offsetHorizontal}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      feedback={feedback}
      {...props}
    >
      <Text variant="headline" textAlign="center" color={variants[variant].color} {..._textProps}>
        Button
      </Text>
    </Pressable>
  );
});

Button.displayName = 'Button';
