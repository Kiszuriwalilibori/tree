import { AddItemModal, Item } from "components";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Drzewo wyboru</h1>
            </header>
            <main>
                <Item id={"root"} />
            </main>
            <AddItemModal />
        </div>
    );
}

export default App;
