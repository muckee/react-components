import React from 'react';
import { createRoot } from 'react-dom';

import App from './App';

import '@muckington/react-components/dist/theme.min.css';
import '@muckington/react-components/dist/cjs/index.css';

const root = createRoot(document.getElementById('root'));

// Render the React application within the root element
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
