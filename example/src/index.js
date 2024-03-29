import React from 'react';
import { createRoot } from 'react-dom/client';

import 'remixicon/fonts/remixicon.css';
import '@muckington/react-components/dist/initialize.css';
import '@muckington/react-components/dist/theme.css';
import '@muckington/react-components/dist/index.css';

import App from './App';

const root = createRoot(document.getElementById('root'));

// Render the React application within the root element
root.render(<React.StrictMode>
    <App />
</React.StrictMode>);
