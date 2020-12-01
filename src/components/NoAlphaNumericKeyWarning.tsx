import * as React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import PropTypes from 'prop-types';

interface WarningProps {
  noAlpha: boolean;
}

const Warning = (props:WarningProps) => {
  const {noAlpha} =props;
  return noAlpha ? (
    <Alert severity="error">
      <AlertTitle>Uwaga!!!</AlertTitle>
      Nazwa kryterium musi zawierać choć jeden znak alfanumeryczny.
    </Alert>
  ) : null;
};

export const NoAlphaNumericKeyWarning =React.memo(Warning);

Warning.propTypes ={
  noAlpha: PropTypes.bool
}

