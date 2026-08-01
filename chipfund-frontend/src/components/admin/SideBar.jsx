import {
  LayoutDashboard,
  Users,
  Wallet,
  UserRound,
  CalendarDays,
  Gavel,
  BadgeIndianRupee,
  CreditCard,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// =========================
// Admin Menu
// =========================
const adminMenus = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Members", icon: Users, href: "/admin/members" },
  { name: "Chit Groups", icon: Wallet, href: "/admin/chit-groups" },
  { name: "Group Members", icon: UserRound, href: "/admin/group-members" },
  { name: "Installments", icon: CalendarDays, href: "/admin/installments" },
  { name: "Auctions", icon: Gavel, href: "/admin/auctions" },
  { name: "Bids", icon: BadgeIndianRupee, href: "/admin/bids" },
  { name: "Payments", icon: CreditCard, href: "/admin/payments" },
];

// =========================
// Member Menu
// =========================
const memberMenus = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "My Groups", icon: Wallet, href: "/admin/my-groups" },
  { name: "My Installments", icon: CalendarDays, href: "/admin/my-installments" },
  { name: "My Payments", icon: CreditCard, href: "/admin/my-payments" },
];

export default function Sidebar({ mobileOpen, setMobileOpen, collapsed }) {
  const { user } = useSelector((state) => state.auth);

  const menus =
    user?.role?.toLowerCase() === "admin" ? adminMenus : memberMenus;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen shrink-0 bg-slate-950 border-r border-slate-800 text-white transition-all duration-300 z-50 flex flex-col

        ${collapsed ? "lg:w-20" : "lg:w-72"}
        w-72

        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                ChitFund
              </h1>

              <p className="mt-1 text-xs text-slate-400">Management System</p>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg lg:hidden hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto custom-scrollbar">
          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/admin" || item.href === "/member"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                group flex items-center
                rounded
                transition-all duration-200

                ${collapsed ? "justify-center h-12" : "gap-3 px-4 h-10"}

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <item.icon size={20} className="flex-shrink-0" />

              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

      </aside>
    </>
  );
}
