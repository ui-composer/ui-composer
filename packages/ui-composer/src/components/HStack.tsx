import { compose } from '../theme';

export type HStackProps = React.ComponentProps<typeof HStack>;

export const HStack = compose('div', { flexDirection: 'row' });

HStack.displayName = 'HStack';
