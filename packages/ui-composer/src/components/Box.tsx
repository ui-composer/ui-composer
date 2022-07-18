import { compose } from '../theme';

export type BoxProps = React.ComponentProps<typeof Box>;

export const Box = compose('div');

Box.displayName = 'Box';
