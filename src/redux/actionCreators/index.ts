import { itemsType } from '../../types';
import { createAction } from '@reduxjs/toolkit';
export const initAppend = createAction<string>('redux/input/INIT_APPEND');
export const closeInput = createAction('redux/input/CLOSE_INPUT');
export const removeItem = createAction<string[]>('redux/items/REMOVE_ITEM');
export const appendItem = createAction<itemsType>('redux/items/APPEND');
