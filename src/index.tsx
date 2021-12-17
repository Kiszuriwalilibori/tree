import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import * as serviceWorker from './js/serviceWorker';
import AppProvider from './components/AppProvider';
const App = lazy(() => import('./components/App'));

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
