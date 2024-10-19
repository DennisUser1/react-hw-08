import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContacts,
    addContact,
    deleteContact,
    undoDeleteContact,
    updateContact,
} from "./operations.js";
import { logOut } from "../auth/operations.js";