import { compose } from '../theme';

export type VStackProps = React.ComponentProps<typeof VStack>;

export const VStack = compose('div', { flexDirection: 'column' });

VStack.displayName = 'VStack';
