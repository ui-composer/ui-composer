import React, { memo } from 'react';
import { Button, VStack, VStackProps } from 'ui-composer';

const Debug = memo((props: VStackProps) => {
  return (
    <VStack alignItems="center" justifyContent="center" flexGrow={1} {...props}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="positive">Positive</Button>
      <Button variant="negative">Negative</Button>
    </VStack>
  );
});

Debug.displayName = 'Debug';

export default Debug;
