import { compose } from '../theme';

export type PressableProps = React.ComponentProps<typeof Pressable>;

export const Pressable = compose('button', { flexDirection: 'row' });

Pressable.displayName = 'Pressable';
