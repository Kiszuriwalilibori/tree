import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { AppendItemModal } from "./AppendItemModal";
import { Tree } from "./Tree";
import {StoreType} from "../redux/types";
import PropTypes from 'prop-types';

function localApp(props: { items; isInputActive: boolean; }) {

  const { items, isInputActive } = props;
  const criterias = _.cloneDeep(items);
  const header = criterias.shift();

  return items ? (
    <React.Fragment>
      {isInputActive ? <AppendItemModal /> : null}
      <Tree ary={criterias} primary={true} head={header} />
    </React.Fragment>
  ) : null;
}

const mapStateToProps = (state:StoreType) => ({
  items: state.items.items,
  isInputActive: state.input.isInputActive,
});
const App = connect(mapStateToProps)(localApp);
export default App;


localApp.propTypes ={
  isInputActive: PropTypes.bool,
  items: PropTypes.array
}