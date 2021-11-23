import * as React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { removeItem } from '../../redux/items';
import PropTypes from 'prop-types';
import IconButton from './styles';

interface ButtonProps {
    onClick: Function;
    string: string;
    header: string | undefined;
}

/**
 * Renders the button which removes a node when clicked
 * @param {Function} onClick the function which does the job
 * @param {string} string   indicates node (its text content) to be removed
 * @param {string |undefined} header indicates subtree/scope to which node blonggs, if any
 * @returns button component
 */
const Button = (props: ButtonProps) => {
    const { onClick, string, header } = props;

    const click = React.useCallback(
        debounce((e: React.MouseEvent<HTMLButtonElement>): void => {
            onClick([header, string]);
        }, 200),
        [header, string, onClick],
    );

    return (
        <IconButton onClick={click}>
            <i className="fas fa-minus-circle delete"></i>
        </IconButton>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { payload: string[]; type: string }) => void) => ({
    onClick: (data: string[]): void => dispatch(removeItem(data)),
});

const DeleteItemButton = connect(null, mapDispatchToProps)(React.memo(Button));
export default DeleteItemButton;

Button.propTypes = {
    onClick: PropTypes.func,
    string: PropTypes.string,
    header: PropTypes.string,
};
