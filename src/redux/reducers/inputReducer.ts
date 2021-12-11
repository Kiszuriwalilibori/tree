import { actionCreators } from '..';
import { createReducer } from '@reduxjs/toolkit';
import { Items } from '../../config';

const { closeInput, initAppend } = actionCreators;

const initialState = {
    activeScope: Items.VERY_FIRST_ITEM,
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
