import React, { useEffect } from 'react';

import { init, postMessage } from './events/events-ui';

function App() {
  useEffect(() => {
    init();
    postMessage('loaded');
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Hello</h1>
        <button
          onClick={() => {
            postMessage('close');
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default App;
