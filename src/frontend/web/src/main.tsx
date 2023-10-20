import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './main.scss';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorsProvider } from './controller/provider';

import App from './App.tsx';
import './controller/utils/translations/AppTranslations';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <ErrorsProvider>
        <App />
      </ErrorsProvider>
    </Suspense>
  </React.StrictMode>
);
