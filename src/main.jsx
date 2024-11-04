import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "modern-normalize";
import "tippy.js/dist/tippy.css";
import "flag-icon-css/css/flag-icons.css";
import "izitoast/dist/css/iziToast.min.css";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/tooltip.css";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
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
