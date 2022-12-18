import { Animated } from 'react-native';

import { compose } from '../theme';
import { ThemeableProps } from '../types';

export type SpacerProps = ThemeableProps['spacer'];

export const Spacer = compose(Animated.View, {} as SpacerProps, 'spacer');

Spacer.displayName = 'Spacer';
