import isMainTree from './isMainTree';
import { AppendItemModalFormValues, AppendModalProps } from '../model';

function createItem(
    props: AppendModalProps,
    visibleValues: AppendItemModalFormValues,
    submittedValues: AppendItemModalFormValues,
): string | string[] {
    const { inputValue, shouldInitializeCategory } = visibleValues;

    console.log(props, 'props');
    console.log(visibleValues, 'visibleValues');
    console.log(submittedValues, 'submittedValues');

    if (isMainTree(props)) {
        return shouldInitializeCategory ? [inputValue] : inputValue;
    }

    return submittedValues.inputValue;
}

export default createItem;
