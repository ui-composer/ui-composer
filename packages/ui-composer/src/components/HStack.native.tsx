import { Animated } from 'react-native';

import { compose } from '../theme';

export type HStackProps = React.ComponentProps<typeof HStack>;

export const HStack = compose(Animated.View, { flexDirection: 'row' });

HStack.displayName = 'HStack';
