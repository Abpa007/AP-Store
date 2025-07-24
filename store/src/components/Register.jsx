import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
