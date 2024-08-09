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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getAllCartItems = (state: RootState) => state.cart;
