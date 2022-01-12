import { itemsType } from '../../types';
/**
 * checks whether first elements in two arrays are equal
 * @param ary1
 * @param ary2
 * @returns boolean result of check
 */
export function tablesFit(ary1: itemsType, ary2: itemsType): boolean {
    return ary1[0] === ary2[0];
}
/**
 * flattens array
 * @param arr array possibly nested
 * @returns flattened array
 */

export function getFlattenArray(arr: itemsType): string[] {
    return arr.flat
        ? arr.flat()
        : arr.reduce(
              (acc: string[], val: string[] | string) =>
                  Array.isArray(val) ? acc.concat(getFlattenArray(val)) : acc.concat(val),
              [],
          );
}

/**
 * checks whether array contains element being second element of other array
 * @param array first array
 * @param item second array
 * @returns boolean with information whether above assertion is true
 */
export function validateAgainstDuplicate(array: itemsType, item: string[]): boolean {
    const flatten = getFlattenArray(array);
    return !flatten.includes(item[1]);
}
