import * as React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

interface Props {
    isActive: boolean;
    warningText: string;
}

/**
 * @description Renders warning text
 * @param {bolean} isActive determines whether warning is displayed
 * @param {string} warningText determines text which will be displayed
 * @returns component displaying warning
 */

let Warning = (props: Props): JSX.Element => {
    const { isActive, warningText } = props;
    return isActive && warningText ? (
        <Alert role="alert" severity="error">
            <AlertTitle>Uwaga!!!</AlertTitle>
            {warningText}
        </Alert>
    ) : null;
};

Warning = React.memo(Warning);
export default Warning;
