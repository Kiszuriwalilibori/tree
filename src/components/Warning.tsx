import * as React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

//import { warnings } from '../config';
interface WarningProps {
    isActive: boolean;
    warningText: string;
}

/**
 * Renders warning text
 * @param {bolean} isActive determines whether warning is displayed
 * @param {string} warningText determines text which will be displayed
 * @returns component displaying warning
 */

let Warning = (props: WarningProps): JSX.Element => {
    const { isActive, warningText } = props;
    return isActive ? (
        <Alert role="alert" severity="error">
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
