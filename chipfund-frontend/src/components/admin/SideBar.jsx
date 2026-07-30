import {
  LayoutDashboard,
  Users,
  Wallet,
  UserRound,
  CalendarDays,
  Gavel,
  BadgeIndianRupee,
  CreditCard,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Members", icon: Users, href: "/admin/members" },
  { name: "Chit Groups", icon: Wallet, href: "/admin/chit-groups" },
  { name: "Group Members", icon: UserRound, href: "/admin/group-members" },
  { name: "Installments", icon: CalendarDays, href: "/admin/installments" },
  { name: "Auctions", icon: Gavel, href: "/admin/auctions" },
  { name: "Bids", icon: BadgeIndianRupee, href: "/admin/bids" },
  { name: "Payments", icon: CreditCard, href: "/admin/payments" },
  { name: "Reports", icon: BarChart3, href: "/admin/reports" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar({ mobileOpen, setMobileOpen, collapsed }) {
  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

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
              end={item.href === "/admin"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `
                group flex items-center
                rounded
                transition-all duration-200

                ${collapsed ? "justify-center h-12" : "gap-3 px-4 h-10"}

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              <item.icon size={20} className="flex-shrink-0" />

              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}

        {!collapsed && (
          <div className="p-5 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-900">
              <p className="text-sm font-semibold">Administrator</p>

              <p className="mt-1 text-xs text-slate-400">admin@gmail.com</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
