import { Menu, PanelLeft, UserCircle2, LogOut } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice"; // Update path
import { toast } from "sonner";
import Button from "../../components/common/Button";

export default function Header({ setMobileOpen, collapsed, setCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const capitalizeName = (name) => {
    if (!name) return "Admin";

    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizeText = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-5 bg-white border-b">
      {/* Left */}

      <div className="flex items-center gap-3">
        {/* Desktop Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden p-2 rounded-lg lg:flex hover:bg-gray-100"
        >
          <PanelLeft size={22} />
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* User */}

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} />

          <div className="hidden sm:block">
            <p className="font-medium">{capitalizeName(user?.name)}</p>

            <p className="text-xs text-gray-500">
              {capitalizeText(user?.role) || "Administrator"}
            </p>
          </div>
        </div>

        {/* Logout */}

        <Button
          variant={"outline"}
          size={"sm"}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </header>
  );
}
