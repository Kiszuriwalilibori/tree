import * as React from 'react';
import { connect } from 'react-redux';
import { initAppend } from '../redux/actionCreators';
import useDispatchAction from '../hooks/useDispatchAction';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
    onClick: Function;
    string: string | string[];
    primary: boolean;
}

/**
 * Renders the button which initializes creation of new node
 * @param {Function} onClick the function which does the job
 * @param {string} string   indicates node (its text content) to be created
 * @param {boolean} primary defines whether givennode is primary(directly in main tree) or not
 * @returns button component
 */
const Button = (props: ButtonProps) => {
    const { onClick, string, primary } = props;
    console.log(string, 'string from appenditem');
    const { initAppend } = useDispatchAction();

    return (
        <button
            className={primary ? 'append-primary' : 'append-secondary'}
            onClick={() => {
                onClick(string);
            }}
            role-label="append-button"
        >
            <div className="append__cross"></div>
        </button>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { payload: string[]; type: string }) => void) => ({
    onClick: (data: string[]): void => dispatch(initAppend(data)),
});

const AppendItemButton = connect(null, mapDispatchToProps)(React.memo(Button));
export default AppendItemButton;

Button.propTypes = {
    onClick: PropTypes.func,
    string: PropTypes.string,
    primary: PropTypes.bool,
};
