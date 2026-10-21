import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container flex items-center justify-end px-5 py-4 mx-auto">
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
