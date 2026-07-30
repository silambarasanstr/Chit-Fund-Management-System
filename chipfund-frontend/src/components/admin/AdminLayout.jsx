import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
        />

        <div className="flex flex-col flex-1 min-w-0 min-h-screen">
          <Header
            setMobileOpen={setMobileOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <main className="flex-1 min-w-0 p-5">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
