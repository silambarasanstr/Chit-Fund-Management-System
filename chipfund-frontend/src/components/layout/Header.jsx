import { Bell, Search, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Chit Fund Management System
          </h1>
          <p className="text-sm text-gray-500">
            Manage Members, Groups & Installments
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* User */}
          <Link
            to="/admin"
            className="flex items-center gap-2 px-3 py-2 transition rounded-lg hover:bg-gray-100"
          >
            <UserCircle2 size={36} className="text-indigo-600" />

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
