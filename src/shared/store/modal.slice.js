// Redux Store
import { createSlice } from "@reduxjs/toolkit";

const initialModalData = { isOpen: false, data: {}, isLoading: false };

// Initial state
const initialState = {};

export const modalSlice = createSlice({
  initialState,
  name: "modal",
  reducers: {
    open: (state, action) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = initialModalData;

      state[modal].isOpen = true;
      Object.assign(state[modal].data, data || {});
    },

    close: (state, action) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = initialModalData;
      
      state[modal].isOpen = false;
      Object.assign(state[modal].data, data || {});
    },

    updateData: (state, action) => {
      const { modal, data } = action.payload;
      if (!state[modal]) state[modal] = initialModalData;

      Object.assign(state[modal].data, data || {});
    },

    updateLoading: (state, action) => {
      const { modal, value } = action.payload;
      if (!state[modal]) state[modal] = initialModalData;

      state[modal].isLoading = value;
    },
  },
});

// Export actions
export const { open, close, updateLoading, updateData } = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;
