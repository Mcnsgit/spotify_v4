import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import GlobalStyles from "./styles/globalStyles.styles"
import store from "./redux/store/store.js";
import Callback from "./utils/Callback.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary >
      <GlobalStyles />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

