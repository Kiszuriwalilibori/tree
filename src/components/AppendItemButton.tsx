import * as React from "react";
import { connect } from "react-redux";
import { initAppend } from "../redux/input";
import { useCallback } from "react";
import PropTypes from "prop-types";

//type ButtonProps = { onClick:Function,string:string, primary:boolean };
interface ButtonProps {
  onClick: Function;
  string: string | string[];
  primary: boolean;
}

const Button = (props: ButtonProps) => {
  const { onClick, string, primary } = props;
  const click = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      onClick(string);
    },
    [onClick, string]
  );

  return (
    <button className={primary ? "append-primary" : "append-secondary"} onClick={click} role-label="append-button">
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
