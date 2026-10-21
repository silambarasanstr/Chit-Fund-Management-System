import { UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-12 px-3 sm:px-4">
        {/* Left */}
        <div>
          <h1 className="text-sm font-bold text-gray-800 sm:text-base">
            Chit Fund Management System
          </h1>

          <p className="text-[10px] text-gray-500 sm:text-xs">
            Manage Members, Groups & Installments
          </p>
        </div>

        {/* Right */}
        <Link
          to="/admin"
          className="flex items-center gap-2 px-2 py-1 transition rounded-md hover:bg-gray-100"
        >
          <UserCircle2 size={26} className="text-indigo-600" />

          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold text-gray-800">Admin</p>

            <p className="text-[10px] text-gray-500">Administrator</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
