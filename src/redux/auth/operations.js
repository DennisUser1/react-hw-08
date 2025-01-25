import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastSuccess, toastError } from "../../shared/helpers/toastConfig.js";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      toastError("Email already registered.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      toastError("Invalid email or password.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    toastSuccess("Goodbye! I hope, see you again!");
    return thunkAPI.dispatch({ type: 'auth/logout' });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      // console.warn("No token found. Skipping refresh.");
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    // console.log("Using token:", persistedToken);
    setAuthHeader(persistedToken);

    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      clearAuthHeader();
      // console.error("Failed to refresh user:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);