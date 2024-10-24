import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastSuccess, toastError } from "../../shared/helpers/toastConfig.js";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact);
            toastSuccess("Contact successfully added!");
            return response.data;
        } catch (error) {
            toastError("Error adding contact.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`); 
            toastSuccess("Contact successfully deleted!");
            return contactId;
        } catch (error) {
            toastError("Error deleting contact.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const undoDeleteContact = createAsyncThunk(
    "contacts/undoContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact); 
            return response.data; 
        } catch (error) {
            toastError("Error undoing contact deletion.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateContact = createAsyncThunk(
    "contacts/updateContact",
    async ({ name, number, id }, thunkAPI) => {
      try {
            const response = await axios.patch(`/contacts/${id}`, { name, number });
            toastSuccess("Contact successfully updated!");
            return response.data;
      } catch (error) {
            toastError("Error updating contact.");
            return thunkAPI.rejectWithValue(error.message);
      }
    }
);
