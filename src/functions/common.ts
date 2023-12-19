import { Items } from "../types";
/**
 * checks whether first elements in two arrays are equal
 * @param ary1
 * @param ary2
 * @returns boolean result of check
 */
export function areTablesFittingEachOther(ary1: Items, ary2: Items): boolean {
    return ary1[0] === ary2[0];
}
