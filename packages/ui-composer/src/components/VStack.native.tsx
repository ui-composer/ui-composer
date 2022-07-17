import { View } from 'react-native';

import { compose } from '../theme';

export type VStackProps = React.ComponentProps<typeof VStack>;

const VStack = compose(View, { flexDirection: 'column' });

VStack.displayName = 'VStack';

export default VStack;
