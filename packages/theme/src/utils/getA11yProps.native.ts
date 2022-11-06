import type { AccessibilityProps } from 'react-native';

import { PsuedoStateProps } from '../types';

export function getA11yProps({ disabled, loading }: PsuedoStateProps): AccessibilityProps {
  return { accessibilityState: { busy: loading, disabled: !!disabled } };
}
