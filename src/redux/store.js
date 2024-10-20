import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice.js";
import filtersReducer from "./filters/slice.js";
import { authReducer } from "./auth/slice.js";
import scrollReducer from "./scroll/scrollReducer.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import logger from 'redux-logger';

const contactsPersistConfig = {
  key: "contacts",
  version: 1,
  storage,
  whitelist: ["items"],
};

const persistedAuthReducer = persistReducer(contactsPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  contacts: contactsReducer,
  filters: filtersReducer,
  scroll: scrollReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export let persistor = persistStore(store);