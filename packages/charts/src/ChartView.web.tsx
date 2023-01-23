import React from 'react';

import { ChartViewProps } from './types';

export default function ChartView(props: ChartViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
