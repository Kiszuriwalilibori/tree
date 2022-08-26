import isMainTree from "./isMainTree";
import { AppendItemModalFormValues, AppendModal } from "../model";
import { Item } from "../../../types";

function createItem(
    props: AppendModal,
    visibleValues: AppendItemModalFormValues,
    submittedValues: AppendItemModalFormValues
): Item {
    const { inputValue, shouldInitializeCategory } = visibleValues;

    if (isMainTree(props)) {
        return shouldInitializeCategory ? [inputValue] : inputValue;
    }

    return submittedValues.inputValue;
}

export default createItem;
