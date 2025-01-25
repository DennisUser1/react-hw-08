import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContacts,
    addContact,
    deleteContact,
    undoDeleteContact,
    updateContact,
    fetchStatistics,
} from "./operations.js";
import { logOut } from "../auth/operations.js";
import { handlePending, handleRejected, handleFulfilled } from "../handlers.js";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  deletedContact: null,
  deletedContactIndex: null,
  wasLastDeleted: false,
  currentEditingContact: null,

  addedCount: 0,  
  deletedCount: 0, 
  updatedCount: 0,
  statistics: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setCurrentEditingContact(state, action) {
      state.currentEditingContact = action.payload;
    },
    resetStatistics(state) {
      state.addedCount = 0;
      state.deletedCount = 0;
      state.updatedCount = 0;
      state.statistics = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        return {
          ...initialState,
          addedCount: state.addedCount,
          deletedCount: state.deletedCount,
          updatedCount: state.updatedCount,
        };
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addedCount += 1;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const indexToDelete = state.items.findIndex(contact => contact.id === action.payload);
        if (indexToDelete === -1) {
          return;
        }
        const contactToDelete = state.items[indexToDelete];
        
        if (contactToDelete) {
          state.deletedContact = contactToDelete;
          state.deletedContactIndex = indexToDelete;
          state.wasLastDeleted = state.items.length === 1; 
          state.items.splice(indexToDelete, 1);
          state.deletedCount += 1;  
        }
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
        state.deletedCount = Math.max(0, state.deletedCount - 1);
      }) 
      .addCase(updateContact.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === state.currentEditingContact.id ? { ...action.payload } : item
        );
        state.currentEditingContact = null;
        state.updatedCount += 1; 
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
        state.isLoading = false;
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulfilled)
  },
});

export const { setCurrentEditingContact } = contactsSlice.actions;
export default contactsSlice.reducer;
