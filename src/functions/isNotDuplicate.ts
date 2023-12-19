import { Items } from "../types";

/**
 * flattens array
 * @param arr array possibly nested
 * @returns flattened array
 */

function getFlattenArray(arr: Items): string[] {
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

function isNotDuplicate(array: Items, item: string[]): boolean {
    const flatten = getFlattenArray(array);
    return !flatten.includes(item[1]);
}

export default isNotDuplicate;
