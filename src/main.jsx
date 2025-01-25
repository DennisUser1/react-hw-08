import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/utils/theme/muiTheme.js"
import "modern-normalize";
import "tippy.js/dist/tippy.css";
import "flag-icon-css/css/flag-icons.css";
import "izitoast/dist/css/iziToast.min.css";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/tooltip.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// Enable React Router v7 experimental flags to transition to new features:
  // 1. `v7_startTransition` - allows you to wrap state updates in `React.startTransition` for smoother transitions.
  // 2. `v7_relativeSplatPath` - changes the behavior of resolving relative routes within routes using an asterisk (splat).