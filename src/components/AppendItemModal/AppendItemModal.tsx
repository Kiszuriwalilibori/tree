import * as React from 'react';
import { connect } from 'react-redux';
import { FormikErrors, useFormik } from 'formik';
import PropTypes from 'prop-types';

import validateAgainstDuplicate from '../../js/functions/validateAgainstDuplicate';
import { RootStateType } from '../AppProvider';
import useDispatchAction from '../../hooks/useDispatchAction';
import { AppendItemModalCriterion } from './AppendItemModalCriterion';
import { AppendItemModalCategoryCheckbox } from './AppendItemModalCategoryCheckbox';
import { validators as validationSchema } from './validators';
import { warnings } from '../../config';
import Warning from '../Warning';

interface AppendModalProps {
    items: (string | string[])[];
    activeScope: string;
}

export interface AppendItemModalFormValues {
    inputValue: string;
    isNotValidated: boolean;
    shouldInitializeCategory: boolean;
}

function isPrimary(props: AppendModalProps): boolean {
    const { activeScope, items } = props;

    return activeScope === items[0];
}

function createItem(
    props: AppendModalProps,
    visibleValues: AppendItemModalFormValues,
    submittedValues: AppendItemModalFormValues
): string | string[] {
    const { inputValue, shouldInitializeCategory } = visibleValues;

    if (isPrimary(props)) {
        return shouldInitializeCategory ? [inputValue] : inputValue;
    }

    return submittedValues.inputValue;
}

function getWarningMessage(
    errors: FormikErrors<AppendItemModalFormValues>,
    values: AppendItemModalFormValues,
    submitCount: number
): string | null {
    if (values.isNotValidated) {
        return warnings.duplicate;
    }

    if (submitCount > 0 && errors.inputValue) {
        return errors.inputValue;
    }

    return null;
}

/**
 * @description Renders the modal for adding a new node
 * @param {Function} onSubmit the function which adds node
 * @param {Function} onClose the function which closes the modal
 * @param {(string | string[])[]} items all tre items, including subtree
 * @param {string} activeScope represents subtree or main tree to which item should be added
 * @returns modal component
 */
export const Modal = (props: AppendModalProps): JSX.Element => {
    const { items, activeScope } = props;
    const { closeInput, appendItem } = useDispatchAction();

    const { values, handleSubmit, getFieldProps, submitCount, errors } =
        useFormik<AppendItemModalFormValues>({
            initialValues: {
                inputValue: '',
                isNotValidated: false,
                shouldInitializeCategory: false,
            },
            validationSchema,
            onSubmit(submittedValues, actions) {
                const { inputValue } = values;

                const isValidated = validateAgainstDuplicate(items, [
                    activeScope,
                    inputValue,
                ]);

                if (isValidated) {
                    const item = createItem(props, values, submittedValues);

                    appendItem([activeScope, item]);
                    closeInput();
                }

                actions.setFieldValue('isNotValidated', !isValidated);
                actions.setSubmitting(false);
            },
        });

    const warningText = getWarningMessage(errors, values, submitCount);

    const warning = warningText ? (
        <Warning
            data-testid="warning"
            isActive={true}
            warningText={warningText}
        />
    ) : null;

    return (
        <div className="modal" role="dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
                {warning}
                <AppendItemModalCriterion
                    inputProps={getFieldProps('inputValue')}
                    onClose={closeInput}
                />
                <AppendItemModalCategoryCheckbox
                    checkboxProps={getFieldProps('shouldInitializeCategory')}
                    id="checkbox"
                    primary={isPrimary(props)}
                />
            </form>
        </div>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    items: state.items.items,
    activeScope: state.input.activeScope,
});

export const AppendItemModal = connect(mapStateToProps, null)(Modal);

Modal.propTypes = {
    items: PropTypes.array,
    activeScope: PropTypes.string,
};
