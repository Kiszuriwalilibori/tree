import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from './styles';
import useDispatchAction from '../../hooks/useDispatchAction';
import { useDebouncedCallback } from '../../hooks/createDebouncedCallback';
interface ButtonProps {
    string: string;
    header: string | undefined;
}

/**
 * Renders the button which removes a node when clicked
 * @param {string} string   indicates node (its text content) to be removed
 * @param {string |undefined} header indicates subtree/scope to which node blonggs, if any
 * @returns button component
 */
const Button = (props: ButtonProps) => {
    const { string, header } = props;
    const { removeItem } = useDispatchAction();
    const handleClick = useDebouncedCallback(removeItem, [header, string]);

    return (
        <IconButton aria-controls={string} aria-label="delete-button" onClick={handleClick}>
            <i className="fas fa-minus-circle delete"></i>
        </IconButton>
    );
};

const DeleteItemButton = React.memo(Button);
export default DeleteItemButton;

Button.propTypes = {
    string: PropTypes.string,
    header: PropTypes.string,
};
