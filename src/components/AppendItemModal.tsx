import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { validateAgainstDuplicate } from '../js/functions';
import DuplicateWarning from './DuplicateWarning';
import InvalidTextWarning from './InvalidTextWarning';
import PropTypes from 'prop-types';
import { itemType } from '../redux/types';
import { RootStateType } from '../index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useDispatchAction from '../hooks/useDispatchAction';

interface appendProps {
    items: (string | string[])[];
    activeScope: string;
}

interface input {
    current: null | any;
}

/**
 * @description Renders the modal for adding a new node
 * @param {Function} onSubmit the function which adds node
 * @param {Function} onClose the function which closes the modal
 * @param {(string | string[])[]} items all tre items, including subtree
 * @param {string} activeScope represents subtree or main tree to which item should be added
 * @returns modal component
 */
const Modal = (props: appendProps): JSX.Element => {
    const { items, activeScope } = props;
    console.log(activeScope, 'activescope');
    const primary = items[0] === activeScope;
    const { closeInput, appendItem } = useDispatchAction();

    const {
        values: { inputValue, isNotValidated, shouldInitializeCategory },
        handleSubmit,
        getFieldProps,
        submitCount,
        errors,
    } = useFormik({
        initialValues: {
            inputValue: '',
            isNotValidated: false,
            shouldInitializeCategory: false,
        },
        validationSchema: Yup.object().shape({
            inputValue: Yup.string()
                .matches(/\d|[A-z]/, 'Kryterium musi zawierać choć jeden znak alfanumeryczny')
                .required('Required'),
        }),
        onSubmit(values, actions) {
            if (validateAgainstDuplicate(items, [activeScope, inputValue])) {
                let result: itemType | input;
                if (primary) {
                    result = shouldInitializeCategory ? [inputValue] : inputValue;
                } else {
                    result = values.inputValue;
                }

                appendItem([activeScope, result]);
                closeInput();

                actions.setSubmitting(false);
            } else {
                actions.setFieldValue('isNotValidated', true);
                actions.setSubmitting(false);
            }
        },
    });

    return (
        <div className="modal">
            <form className="modal-content" onSubmit={handleSubmit}>
                <DuplicateWarning isNotValidated={isNotValidated} />
                <InvalidTextWarning noAlpha={Boolean(Object.keys(errors).length && submitCount)} />
                <span>Wpisz nowe kryterium</span>
                <TextField
                    required
                    size="small"
                    label="Kryterium"
                    variant="outlined"
                    {...getFieldProps('inputValue')}
                />
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                    className="modal-content__button"
                >
                    Dodaj
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    className="modal-content__button"
                    color="secondary"
                    onClick={() => {
                        closeInput();
                    }}
                >
                    Zamknij
                </Button>
                {primary ? (
                    <div>
                        <input
                            className="styled-checkbox"
                            id="checkbox"
                            type="checkbox"
                            {...getFieldProps('shouldInitializeCategory')}
                        ></input>
                        <label htmlFor="checkbox">Inicjować katalog?</label>
                    </div>
                ) : null}
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
