import React from 'react';
import { createRoot } from 'react-dom';

import App from './App';

import '@muckington/react-components/dist/index.css';
// import './App.css';

const root = createRoot(document.getElementById('root'));

// Render the React application within the root element
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
