// 🚀 PREMIUM E-COMMERCE LOGIN PAGE
// src/pages/Login.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/products");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/products");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 space-y-5"
      >
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800">
          👋 Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
        />

        {error && (
          <p className="text-center text-rose-600 text-sm font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 shadow ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
