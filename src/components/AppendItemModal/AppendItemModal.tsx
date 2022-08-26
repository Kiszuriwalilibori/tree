import * as React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import validateAgainstDuplicate from '../../js/functions/validateAgainstDuplicate';
import { RootStateType } from '../AppProvider';
import useDispatchAction from '../../hooks/useDispatchAction';
import { AppendItemModalCriterion } from './parts/AppendItemModalCriterion';
import { AppendItemModalCategoryCheckbox } from './parts/AppendItemModalCategoryCheckbox';
import { validators as validationSchema } from './validators';
import Warning from '../Warning';
import getWarningMessage from './scripts/getWarningMessage';
import { AppendItemModalFormValues, AppendModalProps } from './model';
import createItem from './scripts/createItem';
import isMainTree from './scripts/isMainTree';

/**
 * Checks whether one is in main tree or not
 * @param props
 * @returns
 */

/**
 * @description Renders the modal for adding a new node
 * @param {(string | string[])[]} items all tre items, including subtree
 * @param {string} activeScope represents subtree or main tree to which item should be added
 * @returns modal component
 */
export const Modal = (props: AppendModalProps): JSX.Element => {
    const { items, activeScope } = props;
    const { closeInput, appendItem } = useDispatchAction();
    const { values, handleSubmit, getFieldProps, submitCount, errors } = useFormik<AppendItemModalFormValues>(
        {
            initialValues: {
                inputValue: '',
                isNotValidated: false,
                shouldInitializeCategory: false,
            },
            validationSchema,
            onSubmit(submittedValues, actions) {
                const { inputValue } = values;

                const isValidated = validateAgainstDuplicate(items, [activeScope, inputValue]);

                if (isValidated) {
                    const item = createItem(props, values, submittedValues);
                    appendItem([activeScope, item]);
                    closeInput();
                }
                actions.setFieldValue('isNotValidated', !isValidated);
                actions.setSubmitting(false);
            },
        },
    );
    return (
        <div className="modal" role="dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
                <Warning
                    data-testid="warning"
                    isActive={true}
                    warningText={getWarningMessage(errors, values, submitCount)}
                />
                <AppendItemModalCriterion inputProps={getFieldProps('inputValue')} onClose={closeInput} />
                <AppendItemModalCategoryCheckbox
                    checkboxProps={getFieldProps('shouldInitializeCategory')}
                    id="checkbox"
                    primary={isMainTree(props)}
                />
            </form>
        </div>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    items: state.items.items,
    activeScope: state.input.activeScope,
});

const AppendItemModal = connect(mapStateToProps, null)(Modal);

export default AppendItemModal;
