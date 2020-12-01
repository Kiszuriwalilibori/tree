import {InputStore} from './types';
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
export const initAppend = createAction<string[]>("redux/input/INIT_APPEND");
export const closeInput = createAction("redux/input/CLOSE_INPUT");

const initialState:InputStore = {
  activeScope: [],
  isInputActive: false,
};

const inputsReducer = createReducer(initialState, builder => {
  builder
    .addCase(initAppend, (state, action:PayloadAction<string[]>) => {
      state.activeScope = action.payload;
      state.isInputActive = true;
    })
    .addCase(closeInput, () => initialState)
    .addDefaultCase(() => {});
});

export default inputsReducer;
