// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import adminOrderReducer from "./adminOrderSlice";

const store = configureStore({
  reducer: {
    adminOrders: adminOrderReducer,
  },
});

export default store;
