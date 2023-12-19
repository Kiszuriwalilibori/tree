import { Item, Items } from "types";
import { areTablesFittingEachOther } from "./common";

const checkArray = (ary: Items, arg: string[]): boolean => {
    return areTablesFittingEachOther(ary, arg) && ary.includes(arg[1]) ? false : true; //false if element is contained true when element IS NOT contained
};

const deleteItem = (array: Items, item: string): void => {
    array.splice(array.indexOf(item), 1);
};

export const removeNode = (store: Items, array: string[]) => {
    const removable = array[1];
    if (array[0]) {
        if (!checkArray(store, array)) {
            deleteItem(store, removable);
        } else {
            store.forEach((element): void => {
                Array.isArray(element) && areTablesFittingEachOther(element, array) && deleteItem(element, removable);
            });
        }
    } else {
        store.forEach((element: Item, index: number): void => {
            Array.isArray(element) && element[0] === removable && store.splice(index, 1);
        });
    }
    return store;
};
