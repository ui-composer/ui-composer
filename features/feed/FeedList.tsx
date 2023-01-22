import React, { memo } from 'react';

import { Button, VStack, VStackProps } from '@ui-composer/react';

export const FeedList = memo((props: VStackProps) => {
  return (
    <VStack alignItems="center" flexGrow={1} justifyContent="center" {...props}>
      <Button variant="primary">Primary</Button>
    </VStack>
  );
});

FeedList.displayName = 'FeedList';
