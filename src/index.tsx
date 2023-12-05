import ReactDOM from "react-dom";
import { App, AppProvider } from "./components";
import { register } from "./serviceWorkerRegistration";
import "./styles/App.css";

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById("root")
);

register();
