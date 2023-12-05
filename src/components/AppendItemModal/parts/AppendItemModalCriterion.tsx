import { TextField, Button } from "@material-ui/core";
import { FieldInputProps } from "formik";

import useDebouncedCallback from "hooks/useDebouncedCallback";

interface Props {
    fieldProps: FieldInputProps<unknown>;
    onClose(): unknown;
}
/**
 * Renders component with input which accepts string and delivers functionality of closing modal or creating the new node
 * @param props
 * @returns component
 */
export const AppendItemModalCriterion = (props: Props): JSX.Element => {
    const { fieldProps, onClose } = props;
    const handleClose = useDebouncedCallback(onClose, undefined);

    return (
        <>
            <span>Wpisz nowe kryterium</span>
            <TextField autoFocus required size="small" label="Kryterium" variant="outlined" {...fieldProps} />
            <Button variant="contained" size="large" color="primary" type="submit" className="modal-content__button">
                Dodaj
            </Button>
            <Button
                variant="contained"
                size="large"
                className="modal-content__button"
                color="secondary"
                onClick={handleClose}
            >
                Zamknij
            </Button>
        </>
    );
};
