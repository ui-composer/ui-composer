import React from 'react';
import { Box, HStack, VStack } from 'ui-composer';

function App() {
  return (
    <VStack>
      <HStack>
        <Box spacing={4} color="negativeForeground" backgroundColor="negative" flexGrow={1}>
          hi
        </Box>
        <Box spacing={4} color="primaryForeground" backgroundColor="primary" flexGrow={1}>
          primary
        </Box>
      </HStack>
    </VStack>
  );
}

export default App;
