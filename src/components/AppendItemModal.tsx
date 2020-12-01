import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { closeInput } from "../redux/input";
import {append} from "../redux/items";
import { validateAgainstDuplicate} from "../js/functions";
import { containsAlphanumericKey } from "../js/functions";
import { AttemptToOverwriteExistingKeyWarning } from "./AttemptToOverwriteExistingKeyWarning";
import { NoAlphaNumericKeyWarning } from "./NoAlphaNumericKeyWarning";
import PropTypes from 'prop-types';
import {itemsType}from "../redux/types";

const button = { width: "150px", margin: "0 auto" };

interface appendProps {
  onSubmit:Function,
   onClose:Function,
   items: (string |string[])[],
   activeScope:string
}

interface input {
  current: null |any
}

const UnconnectedAppendItemModal = (props:appendProps) => {

const { onSubmit, onClose, items, activeScope } = props;

let [inputValue, setInputValue] = useState("");
let [isNotValidated, setNoValidated] = useState(false);
let [noAlpha, setNoAlpha] = useState(false);

const primary = items[0] === activeScope; //checks whether is in primary element
const input = useRef(null);

const submit = (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  if (!containsAlphanumericKey(inputValue)) {
    setNoAlpha((noAlpha = true)); // this state value toggles visibility of no-alphanumeric error message
  } else {
    if (validateAgainstDuplicate(items, [activeScope, inputValue])) {
      //checks whether item is not yet in scheme
      let result: string | string[] | input; //here will be stored result
      if (primary && input.current) {
        // in primary element one can initiate subtree belo
        result = (input && input.current && input.current?.checked) ? [inputValue] : inputValue; //table will be processed to subtree while string to regular node
      } else {
        result = inputValue; // but in secondary element there is no option for subtree
      }
      onSubmit([activeScope, result]);
    } else {
      setNoValidated((isNotValidated = true));
    }
  }
};

const close = (e) => {
  e.preventDefault();
  onClose();
};

return (
  <div className="modal">
    <form className="modal-content" onSubmit={submit}>
      <AttemptToOverwriteExistingKeyWarning isNotValidated={isNotValidated} />
      <NoAlphaNumericKeyWarning noAlpha={noAlpha} />
      <span>Wpisz nowe kryterium</span>
      <TextField required size="small" label="Kryterium" variant="outlined" value={inputValue} onChange={(e) => setInputValue((inputValue = e.target.value))} />
      <Button variant="contained" size="large" color="primary" type="submit" style={button}>
        {" "}
        Dodaj{" "}
      </Button>
      <Button variant="contained" size="large" style={button} color="secondary" onClick={close}>
        {" "}
        Zamknij
      </Button>
      {primary ? (
        <div>
          <input className="styled-checkbox" id="checkbox" ref={input} type="checkbox"></input>
          <label htmlFor="checkbox">Inicjować katalog?</label>
        </div>
      ) : null}
    </form>
  </div>
);
};

const mapStateToProps = (state: { items: { items: itemsType; }; input: { activeScope: string; }; }) => ({
  items: state.items.items,
  activeScope: state.input.activeScope,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: itemsType; type: string; }) => void) => ({
  onSubmit: (data:itemsType):void => {
    dispatch(append(data)); 
    dispatch(closeInput())
  },
  onClose: () => dispatch(closeInput()),
});

export const AppendItemModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAppendItemModal);

UnconnectedAppendItemModal.propTypes ={
  onSubmit:PropTypes.func,
  onClose:PropTypes.func,
  items:PropTypes.array,
  activeScope:PropTypes.string,
}
