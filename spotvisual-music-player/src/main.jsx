import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter} from 'react-router-dom';
import App from "./App.jsx";
import './styles/index.css';
import store from "./redux/store/store.js";
// import GlobalStyles from "./styles/globalStyles.styles"
// import Callback from "./utils/Callback.jsx";
// import AuthContextProvider  from './utils/contexts/AuthContext.jsx';
// import PlaybackContextProvider from './utils/contexts/PlaybackContext.jsx';
// import ViewportContextProvider from './utils/contexts/ViewportContext.jsx';
// import ErrorBoundary from "./components/ErrorBoundary.jsx";
// import './styles/index.css';
// import Login from "./components/login/Login.jsx";
// import Dashboard from "./components/dashboard/Dashboard.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>,

  
)

