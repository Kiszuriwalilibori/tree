/**
 * TODO sprawdzić co sie dziej przy pustym propsie items bo może być błąd albo pustej tabeli
 */

import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import AppendItemModal from "./AppendItemModal";
import MainTree from "./MainTree";
import { RootStateType } from "./AppProvider";
import { Items } from "../types";
import AppTitle from "./MainTree/AppTitle";

interface Props {
    items: Items;
    isInputActive: boolean;
}
export const LocalApp: React.FC<Props> = (props: Props): JSX.Element => {
    const { items, isInputActive } = props;
    const criterias = items ? _.cloneDeep(items) : null;
    const header = criterias ? (criterias.shift() as string) : null;
    return items ? (
        <main>
            <AppTitle />
            {isInputActive ? <AppendItemModal /> : null}
            <MainTree ary={criterias} header={header} />
        </main>
    ) : null;
};

const mapStateToProps = (state: RootStateType) => ({
    items: state.items.items,
    isInputActive: state.input.isInputActive,
});

const App = connect(mapStateToProps)(LocalApp);
export default App;
