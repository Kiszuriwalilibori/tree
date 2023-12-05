import { memo } from "react";

import { Alert, AlertTitle } from "@material-ui/lab";

interface Props {
    warningText: string;
}

/**
 * @description Renders warning text
 * @param {bolean} isActive determines whether warning is displayed
 * @param {string} warningText determines text which will be displayed
 * @returns component displaying warning
 */

let Warning = (props: Props): JSX.Element => {
    const { warningText } = props;
    return (
        <Alert role="alert" severity="error">
            <AlertTitle>Uwaga !!!</AlertTitle>
            {warningText ? warningText : "Non-described problem"}
        </Alert>
    );
};

export default memo(Warning);
