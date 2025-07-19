import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch orders (GET)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("http://localhost:5000/api/orders");
  const data = await response.json();
  return data;
});

// ✅ Create order (POST) with paymentMethod included
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ cartItems, shippingInfo, totalAmount, paymentMethod }) => {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        shippingInfo,
        totalAmount,
        paymentMethod, // ✅ now included
      }),
    });
    const data = await response.json();
    return data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order); // ✅ add the created order correctly
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
