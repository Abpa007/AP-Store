// src/store/adminOrderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch all orders for admin
export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async () => {
    const response = await fetch("http://localhost:5000/api/orders");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch orders");
    }
    const data = await response.json();
    return data; // Should be an array of orders
  }
);

// ✅ Update order status to Completed
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async (orderId) => {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update order status");
    }
    const data = await response.json();
    return data.order; // Return the updated order
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Update order status to Completed
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default adminOrderSlice.reducer;
