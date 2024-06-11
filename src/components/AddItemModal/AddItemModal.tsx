import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import styled from "@emotion/styled";

import { useCallback, useId, useRef } from "react";
import { useMessage, useEnhancedState } from "hooks";
import { useModalStore, useItemsStore } from "store";

const WARNING_DUPLICATE = "Takie kryterium już istnieje i nie może być zduplikowane";

interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
        color: "#123456",
    },
}));

interface XFormControlLabelProps extends FormControlLabelProps {
    callback: Function;
}
function MyFormControlLabel(props: XFormControlLabelProps) {
    const radioGroup = useRadioGroup();
    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} onChange={() => props.callback(props.value)} />;
}

export const AddItemModal = () => {
    const { items, updateItems: updateTestItems } = useItemsStore();
    const isOpen = useModalStore.use.isModalOpen();
    const parent = useModalStore.use.currentItem();
    const closeModal = useModalStore.use.closeModal();
    const handleClose = useModalStore.use.closeModal();
    const [criterion, clearCriterion, setCriterion, isCriterionSet] = useEnhancedState("");
    const refCheckbox = useRef<HTMLInputElement>(null);
    const [relation, , setRelation] = useEnhancedState("And");

    console.log(relation);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRelation(event.target.value);
        console.log("target", event.target.value);
        console.log("relation", relation);
    };

    const checkboxId = useId();
    const showMessage = useMessage();

    const handleSubmit = useCallback(() => {
        if (items.isItemNotYetDefined(criterion)) {
            const newItem = items.createItem(parent.id, criterion, refCheckbox.current.checked, relation);
            const updatedItems = items.addItem(newItem);
            updateTestItems(updatedItems);
            clearCriterion();
            closeModal();
        } else {
            showMessage.warning(WARNING_DUPLICATE);
        }
    }, [criterion, parent, items, relation]);

    return (
        <Modal open={isOpen}>
            <form className="AddItemForm" id="AddItemForm">
                <span>Wpisz nowe kryterium</span>
                <TextField
                    value={criterion}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCriterion(event.target.value);
                    }}
                    autoFocus
                    required
                    size="small"
                    label="Kryterium"
                    variant="outlined"
                />
                <div>
                    <input className="AddItemForm__checkbox" id={checkboxId} type="checkbox" ref={refCheckbox}></input>
                    <label htmlFor={checkboxId}>Inicjować katalog?</label>
                </div>

                <Button disabled={!isCriterionSet} variant="contained" size="large" color="primary" className="AddItemForm__button" onClick={handleSubmit}>
                    Dodaj
                </Button>
                <Button variant="contained" size="large" className="AddItemForm__button" color="secondary" onClick={handleClose}>
                    Zamknij
                </Button>
                <RadioGroup row aria-labelledby="demo-form-control-label-placement" name="position" defaultValue="And">
                    <FormControlLabel value="And" control={<Radio onChange={handleChange} />} label="And" />
                    <FormControlLabel value="Or" control={<Radio onChange={handleChange} />} label="Or" />
                    <FormControlLabel value="Xor" control={<Radio onChange={handleChange} />} label="Xor" />
                </RadioGroup>
            </form>
        </Modal>
    );
};

export default AddItemModal;
