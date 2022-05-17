import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from './components/Root';
import Entry from './Entry';

const root = createRoot(document.getElementById('app-root')!);
root.render(<Root><Entry /></Root>);
