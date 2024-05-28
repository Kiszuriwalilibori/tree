import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useCallback, useId, useRef } from "react";
import { useMessage, useEnhancedState } from "hooks";
import { useModalStore, useItemsStore } from "store";

const WARNING_DUPLICATE = "Takie kryterium już istnieje i nie może być zduplikowane";

export const AddItemModal = () => {
    const { items, updateItems: updateTestItems } = useItemsStore();
    const isOpen = useModalStore.use.isModalOpen();
    const parent = useModalStore.use.currentItem();
    const closeModal = useModalStore.use.closeModal();
    const handleClose = useModalStore.use.closeModal();
    const [criterion, clearCriterion, setCriterion, isCriterionSet] = useEnhancedState("");
    const refCheckbox = useRef<HTMLInputElement>(null);

    const checkboxId = useId();
    const showMessage = useMessage();

    const handleSubmit = useCallback(() => {
        if (items.isItemNotYetDefined(criterion)) {
            const newItem = items.createItem(parent.id, criterion, refCheckbox.current.checked);
            const updatedItems = items.addItem(newItem);
            updateTestItems(updatedItems);
            clearCriterion();
            closeModal();
        } else {
            showMessage.warning(WARNING_DUPLICATE);
        }
    }, [criterion, parent, items]);

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
            </form>
        </Modal>
    );
};

export default AddItemModal;
