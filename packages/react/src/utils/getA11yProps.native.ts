import type { AccessibilityProps } from 'react-native';

import type { PsuedoStateProps } from '../createTheme';

export function getA11yProps({ disabled, loading }: PsuedoStateProps): AccessibilityProps {
  return { accessibilityState: { busy: loading, disabled: !!disabled } };
}
