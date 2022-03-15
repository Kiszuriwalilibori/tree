import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './components/AppProvider';
import App from './components/App';
import * as serviceWorker from './service-worker';
import { register } from './serviceWorkerRegistration';
ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);

register();
