import { withStyles } from '@material-ui/core/styles';
import { default as Button } from '@material-ui/core/IconButton';

const iconColor = '#F15C6A';
const iconHoverColor = 'rgba(241, 92, 106, 0.34)';

const IconButton = withStyles({
    root: {
        color: iconColor,
        transition: 'background-color 0.5s ease-in-out',
        '&:hover': { backgroundColor: iconHoverColor },
    },
})(Button);

export default IconButton;
