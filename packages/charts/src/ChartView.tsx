import React from 'react';
import { requireNativeViewManager } from 'expo-modules-core';

import { ChartViewProps } from './types';

const NativeView: React.ComponentType<ChartViewProps> = requireNativeViewManager('Chart');

export default function ChartView(props: ChartViewProps) {
  return <NativeView {...props} />;
}
