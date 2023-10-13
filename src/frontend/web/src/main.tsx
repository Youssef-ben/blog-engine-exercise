import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { setAppTranslation } from './controller/utils/translations';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Set the Language of the project
void setAppTranslation(new I18nextBrowserLanguageDetector());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
