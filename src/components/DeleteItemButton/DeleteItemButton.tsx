import * as React from "react";

import IconButton from "./styles";

interface Props {
    nodeText: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Renders the button which removes a node when clicked
 * @param {string} nodeText   indicates node (its text content) to be removed
 * @param {React.MouseEventHandler<HTMLButtonElement>} handleClick which removes certain node
 * @returns button component
 */
const DeleteItemButton = (props: Props) => {
    const { nodeText, handleClick } = props;

    return (
        <IconButton itemProp={nodeText} aria-label="delete-button" onClick={handleClick}>
            <span className="fas fa-minus-circle delete"></span>
        </IconButton>
    );
};

export default DeleteItemButton;
