import { TextField, Button } from '@material-ui/core';
import { FieldInputProps } from 'formik';

export interface CriterionProps {
    inputProps: FieldInputProps<unknown>;
    onClose(): unknown;
}

export const AppendItemModalCriterion = (
    props: CriterionProps
): JSX.Element => {
    const { inputProps, onClose } = props;

    return (
        <>
            <span>Wpisz nowe kryterium</span>
            <TextField
                required
                size="small"
                label="Kryterium"
                variant="outlined"
                {...inputProps}
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
                onClick={() => onClose()}
            >
                Zamknij
            </Button>
        </>
    );
};
