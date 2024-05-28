import { AddItemModal, Item } from "components";
import { ROOT_ID } from "config";

function App() {
    return (
        <div className="App">
            <header className="App__header">
                <h1 className="App__title">Drzewo wyboru</h1>
            </header>
            <main>
                <Item id={ROOT_ID} />
            </main>
            <AddItemModal />
        </div>
    );
}

export default App;
