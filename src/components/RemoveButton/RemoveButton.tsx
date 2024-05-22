import * as React from "react";

import StyledButton from "./styles";

interface Props {
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Renders the button which removes a node when clicked
 * @param {string} nodeText   indicates node (its text content) to be removed
 * @param {React.MouseEventHandler<HTMLButtonElement>} handleClick which removes certain node
 * @returns button component
 */
export const RemoveButton = (props: Props) => {
    const { handleClick } = props;

    return (
        <StyledButton aria-label="delete-button" onClick={handleClick}>
            <span className="fas fa-minus-circle delete"></span>
        </StyledButton>
    );
};

export default RemoveButton;
