import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">MyCompany</Link>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600")}>
            About
          </NavLink>
          {/* compact button suitable for sm */}
          <Button size="sm" variant="primary" className="btn">
            Contact
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
