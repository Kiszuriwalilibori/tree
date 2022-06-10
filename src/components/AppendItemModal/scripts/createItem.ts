import isMainTree from './isMainTree';
import { AppendItemModalFormValues, AppendModalProps } from '../model';

function createItem(
    props: AppendModalProps,
    visibleValues: AppendItemModalFormValues,
    submittedValues: AppendItemModalFormValues,
): string | string[] {
    const { inputValue, shouldInitializeCategory } = visibleValues;

    if (isMainTree(props)) {
        return shouldInitializeCategory ? [inputValue] : inputValue;
    }

    return submittedValues.inputValue;
}

export default createItem;
