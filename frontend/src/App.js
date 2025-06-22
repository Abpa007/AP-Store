import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateProducts from "./components/CreateProducts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
