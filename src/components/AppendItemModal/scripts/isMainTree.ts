import { AppendModal } from "../model";
/**
 * @description This function checks whether item shall be added to main tree or not(it means to its branch)
 * @param props
 * @returns true if to main tree, otherwise false
 */

function isMainTree(props: AppendModal): boolean {
    const { activeScope, items } = props;
    return activeScope === items[0];
}

export default isMainTree;

// TODO moze lepsza nazwa isAddingToMainTree
