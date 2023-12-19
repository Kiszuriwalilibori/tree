import { useFormik } from "formik";
import { useMemo } from "react";
import { Modal } from "@material-ui/core";

import Warning from "../Warning";

import { useItems, useInput } from "store";
import { AppendItemModalFormValues, AppendModal } from "types";
import { AppendItemModalCriterion, AppendItemModalCategoryCheckbox } from "./parts";
import { validators as validationSchema } from "./validators";
import { getWarningMessage, createItem, isMainTree } from "./scripts";
import { renderConditionally } from "HOCs";
import { isNotDuplicate } from "functions";

/**
 * @description Renders the modal for adding a new node
 * @param {(string | string[])[]} items all tre items, including subtree
 * @param {string} activeScope represents subtree or main tree to which item should be added
 * @returns modal component
 */
export const AppendItemModal = (): JSX.Element => {
    const {
        closeInput,
        input: { activeScope },
    } = useInput();

    const { items, appendItem } = useItems();
    const mainTreeData: AppendModal = { items: items, activeScope: activeScope };

    const { values, handleSubmit, getFieldProps, submitCount, errors } = useFormik<AppendItemModalFormValues>({
        initialValues: {
            inputValue: "",
            isNotValidated: false,
            shouldInitializeCategory: false,
        },
        validationSchema,
        onSubmit(submittedValues, actions) {
            const { inputValue } = values;
            const isValidated = isNotDuplicate(items, [activeScope, inputValue]);

            if (isValidated) {
                const item = createItem(mainTreeData, values, submittedValues);
                item && appendItem([activeScope, item]);
                closeInput();
            }
            actions.setFieldValue("isNotValidated", !isValidated);
            actions.setSubmitting(false);
        },
    });

    const warning = useMemo(() => getWarningMessage(errors, values, submitCount), [errors, values, submitCount]);

    return (
        <Modal open={true}>
            <form className="modal-content" onSubmit={handleSubmit}>
                {warning && (
                    <Warning data-testid="warning" warningText={getWarningMessage(errors, values, submitCount)} />
                )}
                <AppendItemModalCriterion fieldProps={getFieldProps("inputValue")} onClose={closeInput} />
                <AppendItemModalCategoryCheckbox
                    fieldProps={getFieldProps("shouldInitializeCategory")}
                    id="checkbox"
                    condition={isMainTree(mainTreeData)}
                />
            </form>
        </Modal>
    );
};

export default renderConditionally(AppendItemModal);
