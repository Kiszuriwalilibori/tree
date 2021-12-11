import * as React from 'react';

import useDispatchAction from '../hooks/useDispatchAction';
import PropTypes from 'prop-types';

interface ButtonProps {
    string: string;
    primary: boolean;
}

/**
 * Renders the button which initializes creation of new node
 * @param initAppend the function which does the job
 * @param {string} string   indicates node (its text content) to be created
 * @param {boolean} primary defines whether givennode is primary(directly in main tree) or not
 * @returns button component
 */
const Button = (props: ButtonProps) => {
    const { string, primary } = props;
    const { initAppend } = useDispatchAction();

    return (
        <button
            className={primary ? 'append-primary' : 'append-secondary'}
            onClick={() => {
                initAppend(string);
            }}
            role-label="append-button"
        >
            <div className="append__cross"></div>
        </button>
    );
};

const AppendItemButton = React.memo(Button);
export default AppendItemButton;

Button.propTypes = {
    string: PropTypes.string,
    primary: PropTypes.bool,
};
