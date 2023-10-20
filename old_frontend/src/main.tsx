import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './index.scss';

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
