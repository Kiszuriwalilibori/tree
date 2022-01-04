import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from './styles';

interface ButtonProps {
    nodeText: string;
    // header: string | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Renders the button which removes a node when clicked
 * @param {string} nodeText   indicates node (its text content) to be removed
 * @param {React.MouseEventHandler<HTMLButtonElement>} handleClick which removes certain node
 * @returns button component
 */
const Button = (props: ButtonProps) => {
    const { nodeText, handleClick } = props;

    return (
        <IconButton aria-controls={nodeText} aria-label="delete-button" onClick={handleClick}>
            <i className="fas fa-minus-circle delete"></i>
        </IconButton>
    );
};

const DeleteItemButton = React.memo(Button);
export default DeleteItemButton;

Button.propTypes = {
    nodeText: PropTypes.string,
    // header: PropTypes.string,
    handleClick: PropTypes.func,
};
