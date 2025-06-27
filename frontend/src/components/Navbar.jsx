import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {!token ? (
            <>
              <Link to="/register" className="hover:text-blue-400 transition flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  />
                  <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Register
              </Link>
              <Link to="/login" className="hover:text-blue-400 transition flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H3m0 0l4-4m-4 4l4 4m13-8v12a2 2 0 01-2 2H7"
                  />
                </svg>
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/products" className="hover:text-green-400 transition flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                Products
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"
                  />
                </svg>
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
