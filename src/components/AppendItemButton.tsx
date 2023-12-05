import * as React from "react";

import useInput from "../store/input.store";
import useDebouncedCallback from "hooks/useDebouncedCallback";

interface Props {
    str: string;
    primary: boolean;
}

/**
 * Renders the button which initializes creation of new node
 * @param initAppend the function which does the job
 * @param {str} string   indicates node (its text content) to be created
 * @param {boolean} primary defines whether givennode is primary(directly in main tree) or not
 * @returns button component
 */
const Button = (props: Props) => {
    const { str, primary } = props;
    const { initAppend } = useInput();

    const handleClick = useDebouncedCallback(initAppend, str);

    return (
        <button
            className={primary ? "append-primary" : "append-secondary"}
            onClick={handleClick}
            aria-label="append-button"
            title={primary ? "append-primary-button" : "append-secondary-button"}
        >
            <div className="append__cross"></div>
        </button>
    );
};

const AppendItemButton = React.memo(Button);
export default AppendItemButton;
