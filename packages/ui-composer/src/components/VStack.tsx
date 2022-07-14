import React from 'react';

import { compose } from '../theme';

export type VStackProps = React.ComponentProps<typeof VStack>;

const VStack = compose('div', { flexDirection: 'column' });

VStack.displayName = 'VStack';

export default VStack;
