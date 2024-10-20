import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContacts,
    addContact,
    deleteContact,
    undoDeleteContact,
    updateContact,
} from "./operations.js";
import { logOut } from "../auth/operations.js";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  deletedContact: null,
  deletedContactIndex: null,
  wasLastDeleted: false,
  currentEditingContact: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setCurrentEditingContact(state, action) {
      state.currentEditingContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const indexToDelete = state.items.findIndex(contact => contact.id == action.payload);
        if (indexToDelete == -1) {
          return;
        }
        const contactToDelete = state.items[indexToDelete];
        
        if (contactToDelete) {
          state.deletedContact = contactToDelete;
          state.deletedContactIndex = indexToDelete;
          state.wasLastDeleted = state.items.length == 1; 
          state.items.splice(indexToDelete, 1);
        }

        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(undoDeleteContact.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(undoDeleteContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload); 

        if (state.deletedContactIndex !== null && state.deletedContactIndex !== undefined) {
          const restoredContact = state.items.shift();
          if (state.wasLastDeleted && state.items.length > 0) {
            state.items.splice(1, 0, restoredContact); 
          } else {
            state.items.splice(state.deletedContactIndex, 0, restoredContact);
          }
        }
        state.deletedContact = null;
        state.deletedContactIndex = null;   
        state.wasLastDeleted = false; 
        state.isLoading = false;
      }) 
      .addCase(undoDeleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload; 
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === state.currentEditingContact.id ? { ...action.payload } : item
        );
        state.currentEditingContact = null;
      });
  },
});

export const { setCurrentEditingContact } = contactsSlice.actions;
export default contactsSlice.reducer;
