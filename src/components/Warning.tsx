import * as React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

//import { warnings } from '../config';
interface WarningProps {
    isActive: boolean;
    warningText: string;
}
let Warning = (props: WarningProps): JSX.Element => {
    const { isActive, warningText } = props;
    return isActive ? (
        <Alert severity="error">
            <AlertTitle>Uwaga!!!</AlertTitle>
            {warningText}
        </Alert>
    ) : null;
};

Warning = React.memo(Warning);
export default Warning;
// Warning.propTypes = {
//     missingAlphaChars: PropTypes.bool,
// };
