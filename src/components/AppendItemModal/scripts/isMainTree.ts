import { AppendModal } from "types";
/**
 * @description This function checks whether item shall be added to main tree or not(it means to its branch)
 * @param appendModalData
 * @returns true if to main tree, otherwise false
 */

function isMainTree(appendModalData: AppendModal): boolean {
    const { activeScope, items } = appendModalData;
    return activeScope === items[0];
}

export default isMainTree;
