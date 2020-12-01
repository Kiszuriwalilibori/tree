import React, { Suspense } from "react";
import EmptyLoader from "./EmptyLoader";

const Awaiting = (Component) => {
  return (props) => (
    <Suspense fallback={EmptyLoader()}>
      <Component {...props} />
    </Suspense>
  );
};
export default Awaiting;
