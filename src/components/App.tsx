import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { AppendItemModal } from './AppendItemModal';
import { Tree } from './Tree';
import { RootStateType } from './AppProvider';
import { itemsType } from '../types';

interface PropsTypes {
    items: itemsType;
    isInputActive: boolean;
}
export const LocalApp: React.FC<PropsTypes> = (props: PropsTypes): JSX.Element => {
    const { items, isInputActive } = props;
    const criterias = _.cloneDeep(items);
    const header = criterias.shift() as string;

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

const App = connect(mapStateToProps)(LocalApp);
export default App;

// let App: React.FC<PropsTypes> = (props: PropsTypes) => {
//     const { items, isInputActive } = props;
//     const criterias = _.cloneDeep(items);
//     const header = criterias.shift() as string;

//     return items ? (
//         <React.Fragment>
//             {isInputActive ? <AppendItemModal /> : null}
//             <Tree ary={criterias} primary={true} head={header} />
//         </React.Fragment>
//     ) : null;
// };

// const mapStateToProps = (state: RootStateType) => ({
//     items: state.items.items,
//     isInputActive: state.input.isInputActive,
// });
// App = connect(mapStateToProps)(App);
// export default App;
