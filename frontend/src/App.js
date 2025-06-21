import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateProducts from "./components/CreateProducts";

const token = localStorage.getItem("token");

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Redirect based on login status when at root ("/") */}
        <Route
          path="/"
          element={<Navigate to={token ? "/products" : "/login"} replace />}
        />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              <CreateProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
