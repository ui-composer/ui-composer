import React, { Children, memo } from 'react';
import { Animated } from 'react-native';

import { compose } from '../theme';
import { join } from '../utils/join';

import { Spacer } from './Spacer.native';

export type VStackProps = React.ComponentProps<typeof Wrapper>;

const Wrapper = compose(Animated.View, { flexDirection: 'column' });

export const VStack = memo(function VStack({ gap, children, ...props }: VStackProps) {
  const content = gap
    ? join(
        Children.toArray(children as unknown as React.ReactNode | React.ReactNode[]),
        <Spacer vertical={gap} />
      )
    : children;

  return <Wrapper {...props}>{content}</Wrapper>;
});

VStack.displayName = 'VStack';
