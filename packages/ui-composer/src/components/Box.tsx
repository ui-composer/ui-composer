import { compose } from '../theme';

export type BoxProps = React.ComponentProps<typeof Box>;

const Box = compose('div');

Box.displayName = 'Box';

export default Box;
