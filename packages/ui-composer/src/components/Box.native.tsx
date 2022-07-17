import { View } from 'react-native';

import { compose } from '../theme';

export type BoxProps = React.ComponentProps<typeof Box>;

const Box = compose(View);

Box.displayName = 'Box';

export default Box;
