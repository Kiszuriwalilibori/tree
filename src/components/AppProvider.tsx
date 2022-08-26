import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import "../styles/App.css";
import itemsReducer from "../redux/reducers/itemsReducer";
import inputsReducer from "../redux/reducers/inputReducer";

const rootReducer = combineReducers({ items: itemsReducer, input: inputsReducer });

const store = configureStore({
    reducer: rootReducer,
});

const AppProvider: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
