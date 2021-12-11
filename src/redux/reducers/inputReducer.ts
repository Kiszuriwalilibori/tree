import { actionCreators } from '..';
import { createReducer } from '@reduxjs/toolkit';

const { closeInput, initAppend } = actionCreators;
const initialState = {
    activeScope: 'People',
    isInputActive: false,
};

const inputsReducer = createReducer(initialState, builder => {
    builder
        .addCase(initAppend, (state, action) => {
            state.activeScope = action.payload;
            state.isInputActive = true;
        })
        .addCase(closeInput, () => initialState)
        .addDefaultCase(() => {});
});

export default inputsReducer;
