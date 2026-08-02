import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Employees from "../pages/Employees";
import Dashboard from "../admin/Dashboard";
import AdminLayout from "../components/admin/AdminLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Members from "../admin/Members";
import ChitGroups from "../admin/ChitGroups";
import GroupMembers from "../admin/GroupMembers";
import Installments from "../admin/Installments";
import Auctions from "../admin/Auctions";
import Bids from "../admin/Bids";
import Payments from "../admin/Payments";

import MyGroups from "../member/MyGroups";
import MyInstallments from "../member/MyInstallments";
import MyPayments from "../member/MyPayments";
import Features from "../pages/Features";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="chit-groups" element={<ChitGroups />} />
          <Route path="group-members" element={<GroupMembers />} />
          <Route path="installments" element={<Installments />} />
          <Route path="auctions" element={<Auctions />} />
          <Route path="bids" element={<Bids />} />
          <Route path="payments" element={<Payments />} />
          <Route path="employees" element={<Employees />} />

          {/* Member */}
          <Route path="my-groups" element={<MyGroups />} />
          <Route path="my-installments" element={<MyInstallments />} />
          <Route path="my-payments" element={<MyPayments />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
