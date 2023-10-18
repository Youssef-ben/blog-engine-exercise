import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AppNavigation } from './AppNavigation.tsx';
import './controller/utils/translations/AppTranslations';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <AppNavigation />
    </Suspense>
  </React.StrictMode>
);
