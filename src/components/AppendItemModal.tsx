import * as React from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { closeInput } from "../redux/input";
import { append } from "../redux/items";
import { validateAgainstDuplicate } from "../js/functions";
import { AttemptToOverwriteExistingKeyWarning } from "./AttemptToOverwriteExistingKeyWarning";
import { NoAlphaNumericKeyWarning } from "./NoAlphaNumericKeyWarning";
import PropTypes from "prop-types";
import { itemsType } from "../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";

interface appendProps {
  onSubmit: Function;
  onClose: Function;
  items: (string | string[])[];
  activeScope: string;
}

interface input {
  current: null | any;
}

const button = { width: "150px", margin: "0 auto" };

const Modal = (props: appendProps) => {
  const { onSubmit, onClose, items, activeScope } = props;
  const primary = items[0] === activeScope;

  const close = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClose();
  };

  const {
    values: { inputValue, isNotValidated, shouldInitializeCategory },
    handleSubmit,
    getFieldProps,
    submitCount,
    errors,
  } = useFormik({
    initialValues: {
      inputValue: "",
      isNotValidated: false,
      shouldInitializeCategory: false,
    },
    validationSchema: Yup.object().shape({
      inputValue: Yup.string()
        .matches(/\d|[A-z]/, "Kryterium musi zawierać choć jeden znak alfanumeryczny")
        .required("Required"),
    }),
    onSubmit(values, actions) {
      if (validateAgainstDuplicate(items, [activeScope, inputValue])) {
        let result: string | string[] | input;
        if (primary) {
          result = shouldInitializeCategory ? [inputValue] : inputValue;
        } else {
          result = values.inputValue;
        }
        onSubmit([activeScope, result]);
        actions.setSubmitting(false);
      } else {
        actions.setFieldValue("isNotValidated", true);
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <AttemptToOverwriteExistingKeyWarning isNotValidated={isNotValidated} />
        <NoAlphaNumericKeyWarning noAlpha={Boolean(Object.keys(errors).length && submitCount)} />
        <span>Wpisz nowe kryterium</span>
        <TextField required size="small" label="Kryterium" variant="outlined" {...getFieldProps("inputValue")} />
        <Button variant="contained" size="large" color="primary" type="submit" style={button}>
          Dodaj
        </Button>
        <Button variant="contained" size="large" style={button} color="secondary" onClick={close}>
          Zamknij
        </Button>
        {primary ? (
          <div>
            <input className="styled-checkbox" id="checkbox" type="checkbox" {...getFieldProps("shouldInitializeCategory")}></input>
            <label htmlFor="checkbox">Inicjować katalog?</label>
          </div>
        ) : null}
      </form>
    </div>
  );
};

const mapStateToProps = (state: { items: { items: itemsType }; input: { activeScope: string } }) => ({
  items: state.items.items,
  activeScope: state.input.activeScope,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: itemsType; type: string }) => void) => ({
  onSubmit: (data: itemsType): void => {
    dispatch(append(data));
    dispatch(closeInput());
  },
  onClose: () => dispatch(closeInput()),
});

export const AppendItemModal = connect(mapStateToProps, mapDispatchToProps)(Modal);

Modal.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  items: PropTypes.array,
  activeScope: PropTypes.string,
};
