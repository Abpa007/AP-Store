import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Dynamically get total quantity from Redux store
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-950 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-green-400 hover:text-green-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M10 14h10M10 18h10"
            />
          </svg>
          Ap-Store
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {!token ? (
            <>
              <Link
                to="/register"
                className="hover:text-green-400 transition flex items-center gap-1"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="hover:text-green-400 transition flex items-center gap-1"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/products"
                className="hover:text-green-400 transition flex items-center gap-1"
              >
                Products
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative hover:text-green-400 transition flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5m1.6 8l-2 9m5-9v9m6-9v9m-4-4h4"
                  />
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm shadow-sm transition flex items-center gap-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
