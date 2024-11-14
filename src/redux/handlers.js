export const handlePending = (state) => {
    state.isLoading = true;
    state.isError = null;
};
export const handleRejected = (state, action) => {
    state.isLoading = false;
    state.isError = action.payload;
};
export const handleFulfilled = (state) => {
    state.isLoading = false;
};
