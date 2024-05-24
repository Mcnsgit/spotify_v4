import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import "./styles/index.css";
import store from "./redux/store/store.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ErrorBoundary>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    </ErrorBoundary>
);