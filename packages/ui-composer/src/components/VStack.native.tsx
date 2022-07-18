import { Animated } from 'react-native';

import { compose } from '../theme';

export type VStackProps = React.ComponentProps<typeof VStack>;

export const VStack = compose(Animated.View, { flexDirection: 'column' });

VStack.displayName = 'VStack';
