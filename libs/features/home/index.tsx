import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { Button, VStack, VStackProps } from '@ui-composer/react';

const Home = memo((props: VStackProps) => {
  return (
    <VStack alignItems="center" flexGrow={1} justifyContent="center" {...props}>
      <Button variant="primary">Primary</Button>
    </VStack>
  );
});

Home.displayName = 'Home';

export default Home;
