import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/App.css';
import * as serviceWorker from './js/serviceWorker';
import EmptyLoader from './components/EmptyLoader';
import itemsReducer from './redux/reducers/itemsReducer';
import inputsReducer from './redux/reducers/inputReducer';
import { configureStore } from '@reduxjs/toolkit';

const App = lazy(() => import('./components/App'));

const store = configureStore({ reducer: { items: itemsReducer, input: inputsReducer } });
ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={EmptyLoader()}>
            <App />
        </Suspense>
    </Provider>,
    document.getElementById('root'),
);
export type RootStateType = ReturnType<typeof store.getState>;
serviceWorker.unregister();
