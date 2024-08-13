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
    deleteOneCartItem: (state, action) => {
      const matchedItem = state.find((item) => item._id === action.payload._id);
      if (matchedItem) {
        state.pop(matchedItem);
      }
    },
    deleteMultipleCartItems: (state, action) => {
      const { selectedItems } = action.payload;
      const x = state.length;

      console.log({ selectedItems });
      for (let i = 0; i < x; i++) {
        console.log({ i });
        const matchedIndex = state.findIndex(
          (item) => item?._id === selectedItems[i]?._id
        );
        console.log({ matchedIndex });
        if (matchedIndex !== -1) {
          state.splice(matchedIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, deleteOneCartItem, deleteMultipleCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getAllCartItems = (state: RootState) => state.cart;
