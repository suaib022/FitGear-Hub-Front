/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

export type TCart = {
  _id: string | null;
  name: string | null;
  price: number | null;
  image: string | null;
  quantity: number | null;
  quantityInStock: number | null;
};

const initialState: TCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const matchedItem = state.find((item) => item._id === action.payload._id);
      if (matchedItem) {
        matchedItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    deleteCartItems: (state, action) => {
      const { selectedItems } = action.payload;

      selectedItems.forEach((selectedItem) => {
        const matchedIndex = state.findIndex(
          (item) => item._id === selectedItem._id
        );
        if (matchedIndex !== -1) {
          state.splice(matchedIndex, 1);
        }
      });
    },
  },
});

export const { addToCart, deleteCartItems } = cartSlice.actions;

export default cartSlice.reducer;

export const getAllCartItems = (state: RootState) => state.cart;
