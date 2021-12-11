import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { AppendItemModal } from './AppendItemModal';
import { Tree } from './Tree';
import { RootStateType } from '../index';
interface PropsTypes {
    items: any;
    isInputActive: boolean;
}
const localApp = (props: PropsTypes): JSX.Element => {
    const { items, isInputActive } = props;
    const criterias = _.cloneDeep(items);
    const header = criterias.shift();

    return items ? (
        <React.Fragment>
            {isInputActive ? <AppendItemModal /> : null}
            <Tree ary={criterias} primary={true} head={header} />
        </React.Fragment>
    ) : null;
};

const mapStateToProps = (state: RootStateType) => ({
    items: state.items.items,
    isInputActive: state.input.isInputActive,
});
const App = connect(mapStateToProps)(localApp);
export default App;
