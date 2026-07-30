import { Menu, PanelLeft, Bell, UserCircle2 } from "lucide-react";

export default function Header({
  setMobileOpen,
  collapsed,
  setCollapsed,
}) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-5 bg-white border-b">

      <div className="flex items-center gap-3">

        {/* Desktop Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden p-2 rounded-lg lg:flex hover:bg-gray-100"
        >
          <PanelLeft size={22} />
        </button>

        {/* Mobile Drawer */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-5">

        

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} />

          <div className="hidden sm:block">
            <p className="font-medium">Admin</p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}