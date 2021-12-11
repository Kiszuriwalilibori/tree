import { InputStore } from '../types';
import { actionCreators } from '..';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

const { closeInput, initAppend } = actionCreators;
const initialState: InputStore = {
    activeScope: [],
    isInputActive: false,
};

const inputsReducer = createReducer(initialState, builder => {
    builder
        .addCase(initAppend, (state, action: PayloadAction<string[]>) => {
            state.activeScope = action.payload;
            state.isInputActive = true;
        })
        .addCase(closeInput, () => initialState)
        .addDefaultCase(() => {});
});

export default inputsReducer;
