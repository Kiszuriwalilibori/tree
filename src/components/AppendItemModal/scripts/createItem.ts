import { isMainTree } from "../scripts";

import { AppendItemModalFormValues, AppendModal, Item } from "types";

function createItem(
    appendModalData: AppendModal,
    visibleValues: AppendItemModalFormValues,
    submittedValues: AppendItemModalFormValues
): Item {
    const { inputValue, shouldInitializeCategory } = visibleValues;

    if (isMainTree(appendModalData)) {
        return shouldInitializeCategory ? [inputValue] : inputValue;
    }
    return submittedValues.inputValue;
}

export default createItem;
