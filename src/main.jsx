import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import "flag-icon-css/css/flag-icons.css";
import "modern-normalize";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/tooltip.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
