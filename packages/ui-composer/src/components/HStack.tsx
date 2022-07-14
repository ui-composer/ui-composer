import React from 'react';

import { compose } from '../theme';

export type HStackProps = React.ComponentProps<typeof HStack>;

const HStack = compose('div', { flexDirection: 'row' });

HStack.displayName = 'HStack';

export default HStack;
