import { itemsType } from '../redux/types';

export function tablesFit(ary1: itemsType, ary2: itemsType): boolean {
    console.log(ary1, ary2);
    return ary1[0] === ary2[0];
}

function getFlattenArray(arr: itemsType): string[] {
    return arr.flat
        ? arr.flat()
        : arr.reduce(
              (acc: string[], val: string[] | string) =>
                  Array.isArray(val) ? acc.concat(getFlattenArray(val)) : acc.concat(val),
              [],
          );
}

export const containsAlphanumericKey = (str: string): boolean => {
    return /\d|[A-z]/.test(str);
};
export function validateAgainstDuplicate(array: itemsType, item: string[]): boolean {
    const flatten = getFlattenArray(array);

    return !flatten.includes(item[1]);
}
