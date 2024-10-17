import { createSelector, createSlice } from "@reduxjs/toolkit"; 
import { fetchContacts, addContact, deleteContact, undoDeleteContact } from "./contactsOps.js"; 
import { selectNameFilter, selectNumberFilter } from "./filtersSlice.js";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  deletedContact: null,
  deletedContactIndex: null,
  wasLastDeleted: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.reverse();
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
        state.items.unshift(action.payload);
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
      });
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectIsError = (state) => state.contacts.isError;
export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, nameFilter, numberFilter) => {
    const nameFilterLower = nameFilter.toLowerCase();
    const numberFilterLower = numberFilter.toLowerCase();

    return contacts.filter((contact) => {
      const matchesName = contact.name.toLowerCase().includes(nameFilterLower);
      const matchesNumber = contact.number.toLowerCase().includes(numberFilterLower);
      
      return matchesName && matchesNumber;
    });
  }
);

export default contactsSlice.reducer;
