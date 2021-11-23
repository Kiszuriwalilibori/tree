import * as React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';

interface propsType {
    isNotValidated: boolean;
}
/**
 * @description displays warning about criteria duplication
 * @param isNotValidated if tru - means that validation failed
 * @returns modal component
 */
const Warning = (props: propsType): JSX.Element => {
    const { isNotValidated } = props;

    return isNotValidated ? (
        <Alert severity="error">
            <AlertTitle>Uwaga!!!</AlertTitle>
            Takie kryterium już jest. Nie można dodać go po raz drugi.
        </Alert>
    ) : null;
};

const DuplicateWarning = React.memo(Warning);

export default DuplicateWarning;
Warning.propTypes = {
    isNotValidated: PropTypes.bool,
};
