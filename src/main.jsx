import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/tooltip.css";
import "modern-normalize";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>
);
