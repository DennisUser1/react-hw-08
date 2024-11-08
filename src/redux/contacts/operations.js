import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectIsLoading } from "./selectors.js"; 
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
    },   
    {
        condition: (_, thunkAPI) => {
            const isLoading = selectIsLoading(thunkAPI.getState()); 
            if (isLoading) {
                return false;
            }
        },
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
    },
    {
        condition: (_, thunkAPI) => {
            const isLoading = selectIsLoading(thunkAPI.getState()); 
            if (isLoading) {
                return false;
            }
        },
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
    },
    {
        condition: (_, thunkAPI) => {
            const isLoading = selectIsLoading(thunkAPI.getState()); 
            if (isLoading) {
                return false;
            }
        },
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
    },
    {
        condition: (_, thunkAPI) => {
            const isLoading = selectIsLoading(thunkAPI.getState()); 
            if (isLoading) {
                return false;
            }
        },
    }
);

const genderAxios = axios.create({
    baseURL: '/genderapi',
});

export async function determineGender(name) {
    try {
        const response = await genderAxios.get('', {
            params: {
                name: name,
                key: import.meta.env.VITE_API_KEY,
            },
        });
        // console.log(response.data);
        if (response.data && response.data.gender) {
            return response.data.gender;
        } else {
            return 'Unknown';  
        }
    } catch (error) {
        return 'Unknown';
    }
}

export async function generateAvatarUrl(name) {
    const avatarUrl = `https://api.dicebear.com/6.x/adventurer/svg?seed=${name}`;
    return avatarUrl;
}

