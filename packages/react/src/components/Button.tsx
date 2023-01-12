import React, { memo } from 'react';

import { ThemeableProps } from '../types';

import { Pressable, PressableProps } from './Pressable';
import { Text, TextProps } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'negative';
type ButtonVariantsConfig = Record<ButtonVariant, ThemeableProps['all']>;

/** @todo move to tokens configuration */
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
  maxHeight = 56,
  justifyContent = flush ? 'flex-start' : 'center',
  offsetHorizontal = flush ? FLUSH_SPACING : undefined,
  spacingStart = flush ? FLUSH_SPACING : DEFAULT_SPACING,
  spacingEnd = flush ? FLUSH_SPACING : DEFAULT_SPACING,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      alignItems="center"
      backgroundColor={variants[variant].backgroundColor}
      borderColor={variants[variant].borderColor}
      borderWidth={1}
      flexDirection="row"
      flexWrap="nowrap"
      justifyContent={justifyContent}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      offsetHorizontal={offsetHorizontal}
      spacingEnd={spacingEnd}
      spacingStart={spacingStart}
      width={width}
      {...props}
    >
      <Text color={variants[variant].color} textAlign="center" variant="headline" {..._textProps}>
        Button
      </Text>
    </Pressable>
  );
});

Button.displayName = 'Button';
