import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { tablesFit } from '../../js/functions';
import { itemsType, itemType } from '../types';
import { actionCreators } from '..';
import { initialData } from '../../config';
const { removeItem, appendItem } = actionCreators;
const initialState = {
    items: initialData,
};

const itemsReducer = createReducer(initialState, builder => {
    builder
        .addCase(removeItem, (state, action: PayloadAction<string[]>) => {
            state.items = removeNode([...state.items], action.payload);
        })
        .addCase(appendItem, (state, action: PayloadAction<itemsType>) => {
            state.items = createCompletedStore([...state.items], action.payload);
        })
        .addDefaultCase(() => {});
});

export default itemsReducer;

// FUNCTIONS //////////////////////////////////////////////////////////////
// SUPPORTING FUNCTIONS ///////////////////////////////////////////////////
const checkArray = (ary: itemsType, arg: itemsType): boolean => {
    return tablesFit(ary, arg) && ary.includes(arg[1]) ? false : true; //false if element is contained true when element IS NOT contained
};

const deleteItem = (array: itemsType, item: string): void => {
    array.splice(array.indexOf(item), 1);
};

const addItemToStore = (ary1: itemsType, ary2: itemsType): number => ary1.push(ary2[1]);

// MAIN FUNCTIONS ////////////////////////////////////////////////////////

export const removeNode = (store: itemsType, array: string[]) => {
    const removable = array[1];
    if (array[0]) {
        if (!checkArray(store, array)) {
            deleteItem(store, removable);
        } else {
            store.forEach((element): void => {
                Array.isArray(element) && tablesFit(element, array) && deleteItem(element, removable);
            });
        }
    } else {
        store.forEach((element: itemType, index: number): void => {
            Array.isArray(element) && element[0] === removable && store.splice(index, 1);
        });
    }
    return store;
};

export function createCompletedStore(store: any[], item: itemsType) {
    if (tablesFit(store, item)) {
        addItemToStore(store, item);
    } else {
        addItemToStore(
            store.find((element: itemsType) => tablesFit(element, item)),
            item,
        );
    }

    return store;
}
