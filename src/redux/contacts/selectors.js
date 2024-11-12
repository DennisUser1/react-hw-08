import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "../filters/selectors.js";

export const selectContacts = (state) => state.contacts.items;
export const selectCurrentContact = (state) => state.contacts.currentEditingContact;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;

export const selectAddedContactsCount = (state) => state.contacts.addedCount;
export const selectDeletedContactsCount = (state) => state.contacts.deletedCount;
export const selectUpdatedContactsCount = (state) => state.contacts.updatedCount;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, nameFilter, numberFilter) => {
    const nameFilterLower = nameFilter.toLowerCase();
    const numberFilterLower = numberFilter.replace(/\D/g, ''); 
    return contacts
      .filter((contact) => {
        const matchesName = contact.name.toLowerCase().includes(nameFilterLower);
        const cleanedContactNumber = contact.number.replace(/\D/g, '');
        const matchesNumber = cleanedContactNumber.includes(numberFilterLower);
        return matchesName && matchesNumber;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }  
);
