import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out");
    navigate("/login");
    setMenuOpen(false);
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="backdrop-blur bg-gradient-to-r from-gray-950/80 to-gray-900/80 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m6-9v9m-4-4h4"
              />
            </svg>
            Ap-Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-4 items-center text-sm sm:text-base font-medium">
            {!userInfo ? (
              <>
                <Link
                  to="/register"
                  className="hover:text-green-400 transition"
                >
                  Register
                </Link>
                <Link to="/login" className="hover:text-green-400 transition">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="text-green-400 font-semibold hidden md:block">
                  Hi,{" "}
                  {userInfo?.user?.name?.split(" ")[0] ||
                    userInfo?.name?.split(" ")[0] ||
                    "User"}
                </span>
                <Link
                  to="/products"
                  className="hover:text-green-400 transition"
                >
                  Products
                </Link>
                <Link
                  to="/my-orders"
                  className="hover:text-green-400 transition"
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  className="relative flex items-center gap-1 hover:text-green-400 transition"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m6-9v9m-4-4h4"
                    />
                  </svg>
                  Cart
                  <span
                    className={`absolute -top-2 -right-3 text-xs font-bold px-1.5 py-0.5 rounded-full shadow ${
                      cartCount > 0
                        ? "bg-green-500 text-white animate-pulse"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {cartCount}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden flex flex-col gap-1"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>

      {/* Slide Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 text-base">
          {!userInfo ? (
            <>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/register"
                className="hover:text-green-400"
              >
                Register
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="hover:text-green-400"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-green-400 font-semibold">
                Hi,{" "}
                {userInfo?.user?.name?.split(" ")[0] ||
                  userInfo?.name?.split(" ")[0] ||
                  "User"}
              </span>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/products"
                className="hover:text-green-400"
              >
                Products
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/my-orders"
                className="hover:text-green-400"
              >
                My Orders
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/cart"
                className="hover:text-green-400"
              >
                Cart ({cartCount})
              </Link>
              <button
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded text-sm mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        ></div>
      )}
    </>
  );
}

export default Navbar;
