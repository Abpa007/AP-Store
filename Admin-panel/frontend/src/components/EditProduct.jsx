import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-emerald-100 text-emerald-900 border-t border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm font-medium">
          <Link to="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-emerald-600 transition">
            Products
          </Link>
          <Link to="/my-orders" className="hover:text-emerald-600 transition">
            My Orders
          </Link>
          <Link to="/contact" className="hover:text-emerald-600 transition">
            Contact
          </Link>
        </div>

        {/* Credit */}
        <div className="text-center text-xs sm:text-sm text-emerald-800">
          © {new Date().getFullYear()} Ap-Store. All rights reserved. <br />
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-semibold text-emerald-700">Abhay Panchal</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
