import { createSlice } from "@reduxjs/toolkit";

// ✅ Load cart from localStorage if available
const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const storedTotalQuantity =
  parseInt(localStorage.getItem("totalQuantity")) || 0;
const storedTotalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

const initialState = {
  cartItems: storedCartItems,
  totalQuantity: storedTotalQuantity,
  totalAmount: storedTotalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;

      // ✅ Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalQuantity", state.totalQuantity.toString());
      localStorage.setItem("totalAmount", state.totalAmount.toString());
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== id);
      }

      // ✅ Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalQuantity", state.totalQuantity.toString());
      localStorage.setItem("totalAmount", state.totalAmount.toString());
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // ✅ Remove from localStorage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("totalAmount");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
