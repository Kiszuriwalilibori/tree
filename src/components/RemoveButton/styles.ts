import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";

const iconColor = "#F15C6A";
const iconHoverColor = "rgba(241, 92, 106, 0.34)";

const StyledButton = styled(IconButton)({
    color: iconColor,
    position: "absolute",
    right: "0px",
    top: "50%",
    transform: "translateY(-50%)",
    transition: "background-color 0.5s ease-in-out",
    "&:hover": { backgroundColor: iconHoverColor },
    "&:focus": { backgroundColor: iconHoverColor },
});

export default StyledButton;
