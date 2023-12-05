import React from "react";
import cloneDeep from "lodash/cloneDeep";

import AppendItemModal from "./AppendItemModal";
import MainTree from "./MainTree";
import useHandleConnectionStatus from "../hooks/useHandleConnectionStatus";

import { useItems, useInput } from "store";

export const App: React.FC = (): JSX.Element => {
    useHandleConnectionStatus();
    const { items } = useItems();

    const {
        input: { isAppendItemModalVisible },
    } = useInput();
    const content = items ? cloneDeep(items) : null;

    const header = content ? (content.shift() as string) : undefined;

    return items && items.length ? (
        <main>
            <h1 className="AppTitle">Drzewo wyboru</h1>
            <AppendItemModal condition={isAppendItemModalVisible} />
            <MainTree treeContent={content} header={header} />
        </main>
    ) : null;
};

export default App;
