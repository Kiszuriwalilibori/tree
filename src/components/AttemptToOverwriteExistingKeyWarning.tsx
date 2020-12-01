import * as React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import PropTypes from 'prop-types';

interface propsType{
  isNotValidated:boolean
}
const Warning = (props: propsType) => {
  const {isNotValidated} = props;

  return isNotValidated ? (
    <Alert severity="error">
      <AlertTitle>Uwaga!!!</AlertTitle>
      Takie kryterium już jest. Nie można dodać go po raz drugi.
    </Alert>
  ) : null;
}

export const  AttemptToOverwriteExistingKeyWarning = React.memo(Warning);

Warning.propTypes ={
  isNotValidated: PropTypes.bool
}