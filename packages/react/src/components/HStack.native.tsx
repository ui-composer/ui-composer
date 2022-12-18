import React, { Children, memo } from 'react';
import { Animated } from 'react-native';

import { compose } from '../theme';
import { join } from '../utils/join';

import { Spacer } from './Spacer.native';

export type HStackProps = React.ComponentProps<typeof Wrapper>;

const Wrapper = compose(Animated.View, { flexDirection: 'row' });

export const HStack = memo(function HStack({ gap, children, ...props }: HStackProps) {
  const content = gap
    ? join(
        Children.toArray(children as unknown as React.ReactNode | React.ReactNode[]),
        <Spacer horizontal={gap} />
      )
    : children;

  return <Wrapper {...props}>{content}</Wrapper>;
});

HStack.displayName = 'HStack';
