import React from 'react';
import { createRoot } from 'react-dom/client';

import '@muckington/react-components/dist/variables.min.css';
import '@muckington/react-components/dist/theme.min.css';
import '@muckington/react-components/dist/cjs/index.css';

import App from './App';

const root = createRoot(document.getElementById('root'));

// Render the React application within the root element
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
