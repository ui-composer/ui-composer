import React, { useEffect } from 'react';
import { HStack } from 'ui-composer';

import { init, postMessage } from './events/events-ui';

function App() {
  useEffect(() => {
    init();
    postMessage('loaded');
  }, []);

  return (
    <div className="App">
      <HStack>
        <h1>Hello</h1>
        <button
          onClick={() => {
            postMessage('close');
          }}
        >
          Close
        </button>
      </HStack>
    </div>
  );
}

export default App;
