/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

export type TUserDetails = {
  name: string | null;
  contact: number | null;
  email: string | null;
  shippingAddress: string | null;
  receivedFrom: string | null;
};

const initialState: TUserDetails = {
  name: null,
  contact: null,
  email: null,
  shippingAddress: null,
  receivedFrom: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      const { userDetails } = action.payload;
      return { ...state, ...userDetails };
    },
    removeUserDetails: (state) => {
      state.contact = null;
      state.email = null;
      state.name = null;
      state.shippingAddress = null;
      state.receivedFrom = null;
    },
  },
});

export const { addUserDetails, removeUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

export const getUserDetails = (state: RootState) => state?.userDetails;
