import React, { useCallback, useEffect } from 'react';

import { UIMessage } from './types';

type PostMessageFunction = (message: UIMessage) => void;

function App() {
  const postMessage: PostMessageFunction = useCallback(message => {
    parent.postMessage({ pluginMessage: message }, '*');
  }, []);

  useEffect(() => {
    if (typeof parent !== 'undefined') {
      postMessage({ type: 'open' });
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <button
        onClick={() => {
          postMessage({ type: 'close' });
        }}
      >
        Close
      </button>
    </div>
  );
}

export default App;
