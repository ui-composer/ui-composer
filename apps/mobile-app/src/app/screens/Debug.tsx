import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { Button, HStack, Icon, VStack, VStackProps } from '@ui-composer/react';

import materialSymbolsOutlined from '../icons/material/material-symbols-outlined';

const Debug = memo((props: VStackProps) => {
  return (
    <ScrollView>
      <VStack alignItems="center" flexGrow={1} justifyContent="center" {...props}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="positive">Positive</Button>
        <Button variant="negative">Negative</Button>
      </VStack>
    </ScrollView>
  );
});

Debug.displayName = 'Debug';

export default Debug;
