import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { Button, VStack, VStackProps } from '@ui-composer/react';

const Home = memo((props: VStackProps) => {
  return (
    <ScrollView>
      <VStack alignItems="center" flexGrow={1} justifyContent="center" {...props}>
        <Button variant="primary">Multi player</Button>
        <Button variant="secondary">Single player</Button>
      </VStack>
    </ScrollView>
  );
});

Home.displayName = 'Home';

export default Home;
