import { Item, Items } from "../../types";
/**
 * checks whether first elements in two arrays are equal
 * @param ary1
 * @param ary2
 * @returns boolean result of check
 */
export function areTablesFittingEachOther(ary1: Items, ary2: Items): boolean {
    return ary1[0] === ary2[0];
}
/**
 * flattens array
 * @param arr array possibly nested
 * @returns flattened array
 */

export function getFlattenArray(arr: Items): string[] {
    return arr.flat
        ? arr.flat()
        : arr.reduce(
              (acc: string[], val: string[] | string) =>
                  Array.isArray(val) ? acc.concat(getFlattenArray(val)) : acc.concat(val),
              []
          );
}

/**
 * checks whether array contains element being second element of other array
 * @param array first array
 * @param item second array
 * @returns boolean with information whether above assertion is true
 */
export function validateAgainstDuplicate(array: Items, item: string[]): boolean {
    const flatten = getFlattenArray(array);
    return !flatten.includes(item[1]);
}

const checkArray = (ary: Items, arg: string[]): boolean => {
    return areTablesFittingEachOther(ary, arg) && ary.includes(arg[1]) ? false : true; //false if element is contained true when element IS NOT contained
};

const deleteItem = (array: Items, item: string): void => {
    array.splice(array.indexOf(item), 1);
};

const addItemToStore = (ary1: Items, ary2: Items) => ary1.push(ary2[1]);

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

export function createCompletedStore(store: any[], item: Items) {
    if (areTablesFittingEachOther(store, item)) {
        addItemToStore(store, item);
    } else {
        const modifiedArray = [...store.find((element: Items) => areTablesFittingEachOther(element, item)), item[1]];
        const index = store.findIndex((element: Items) => areTablesFittingEachOther(element, item));
        if (index !== -1) {
            store[index] = modifiedArray;
        }
    }

    return store;
}
