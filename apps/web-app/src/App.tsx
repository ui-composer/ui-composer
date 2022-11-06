import React from 'react';

import { Box, HStack, VStack } from '@ui-composer/react';

function App() {
  return (
    <VStack>
      <HStack>
        <Box backgroundColor="negative" color="negativeForeground" flexGrow={1} spacing={4}>
          hi
        </Box>
        <Box backgroundColor="primary" color="primaryForeground" flexGrow={1} spacing={4}>
          primary
        </Box>
      </HStack>
    </VStack>
  );
}

export default App;
