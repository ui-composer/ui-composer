import { Animated } from 'react-native';

import { compose } from '../theme';

export type BoxProps = React.ComponentProps<typeof Box>;

export const Box = compose(Animated.View);

Box.displayName = 'Box';
