import React from 'react';

import colors from '../../styles/colors.css';

function AppProvider() {
  return (
    <div style={colors.light.style} className={colors.light.className}>
      hi
    </div>
  );
}

export default AppProvider;
