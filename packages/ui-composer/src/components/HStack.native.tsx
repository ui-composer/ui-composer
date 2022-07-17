import { View } from 'react-native';

import { compose } from '../theme';

export type HStackProps = React.ComponentProps<typeof HStack>;

const HStack = compose(View, { flexDirection: 'row' });

HStack.displayName = 'HStack';

export default HStack;
