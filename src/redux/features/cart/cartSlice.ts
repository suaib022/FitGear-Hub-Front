import { createSlice } from "@reduxjs/toolkit";

export type TCart = {
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
      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
