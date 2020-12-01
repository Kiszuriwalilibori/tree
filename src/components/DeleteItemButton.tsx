// sends to store array with header of scope and string identifying item within scope
import React from "react";
import { connect } from "react-redux";
import {debounce } from "lodash";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { removeItem } from "../redux/items";
import { useCallback } from "react";
import PropTypes from 'prop-types';

const iconColor ='#F15C6A';
const iconHoverColor ='rgba(241, 92, 106, 0.34)';

const MyIconButton = withStyles({
  root: {
    color: iconColor,
    transition: "background-color 0.5s ease-in-out",
    "&:hover":{backgroundColor: iconHoverColor,}
  },
  
})(IconButton);


interface ButtonProps {
  onClick: Function;
  string: string;
  header: string|undefined;
}

const Button = (props:ButtonProps) => {
  const { onClick, string, header } = props;

  // const click = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>): void=> {
  //     onClick([header, string]);
  //   },
  //   [header, string, onClick]
  // );
  
  const click = useCallback(debounce(
    (e: React.MouseEvent<HTMLButtonElement>): void=> {
      onClick([header, string]);
    },200),
    [header, string, onClick]
  );





  return <MyIconButton onClick={click}>
            <i className="fas fa-minus-circle delete" >
            </i>
          </MyIconButton>;
};

const mapDispatchToProps = (dispatch: (arg0: { payload: string[]; type: string; }) => void) => ({
  onClick: (data:string[]):void => dispatch(removeItem(data)),
});

export const DeleteItemButton = connect(null, mapDispatchToProps)(React.memo(Button));

Button.propTypes ={
  onClick: PropTypes.func,
  string: PropTypes.string,
  header:PropTypes.string
}