import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import "./config/db.js"; // MongoDB connection
import productRoute from "./routes/productRoute/productRoute.js";
import userRoute from "./routes/userRoute/userRoute.js";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
// ✅ CORS: Allow requests from React (localhost:3000)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Middleware: Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Serve image uploads statically
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
