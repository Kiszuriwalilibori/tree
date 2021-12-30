import React from 'react';
import { Provider } from 'react-redux';
import '../styles/App.css';
//import * as serviceWorker from '../js/serviceWorker';
import itemsReducer from '../redux/reducers/itemsReducer';
import inputsReducer from '../redux/reducers/inputReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: { items: itemsReducer, input: inputsReducer } });

const AppProvider: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;

//serviceWorker.unregister();
