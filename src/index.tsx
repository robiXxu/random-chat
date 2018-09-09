import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
