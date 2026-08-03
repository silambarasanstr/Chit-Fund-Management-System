import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import Button from "../components/common/Button";
import { formatDate } from "../utils/dateFormatter";
import {
  Users,
  UserCheck,
  Layers3,
  CalendarDays,
  CreditCard,
  Gavel,
  Wallet,
  IndianRupee,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboard();

      if (res.success) {
        setDashboard(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboard.totalUsers ?? 0,
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Members",
      value: dashboard.totalMembers ?? 0,
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Chit Groups",
      value: dashboard.totalGroups ?? 0,
      icon: Layers3,
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Installments",
      value: dashboard.totalInstallments ?? 0,
      icon: CalendarDays,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Payments",
      value: dashboard.totalPayments ?? 0,
      icon: CreditCard,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Auctions",
      value: dashboard.totalAuctions ?? 0,
      icon: Gavel,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Collection",
      value: `₹ ${(dashboard.totalCollection ?? 0).toLocaleString()}`,
      icon: Wallet,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Auction Amount",
      value: `₹ ${(dashboard.totalAuctionAmount ?? 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "from-blue-500 to-blue-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white border h-36 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      {/* Header */}
      <div className="mb-8 text-white shadow-xl rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="mt-2 text-indigo-100">
              Welcome back 👋 Manage your chit fund business efficiently.
            </p>

            <p className="mt-2 text-sm text-indigo-200">{formatDate()}</p>
          </div>

          <Button
            onClick={fetchDashboard}
            className="flex items-center gap-2 px-5 py-3 transition rounded-xl bg-white/20 backdrop-blur hover:bg-white/30"
          >
            <RefreshCw size={18} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="relative p-6 overflow-hidden bg-white border shadow-sm group rounded-2xl border-slate-200 "
            >
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} shadow-lg `}
                >
                  <Icon className="text-white h-7 w-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="p-6 bg-white border shadow-sm rounded-2xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Business Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Collection</span>
              <span className="font-bold text-green-600">
                ₹ {(dashboard.totalCollection ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Auction Amount</span>
              <span className="font-bold text-blue-600">
                ₹ {(dashboard.totalAuctionAmount ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Payments</span>
              <span className="font-bold">{dashboard.totalPayments ?? 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Installments</span>
              <span className="font-bold">
                {dashboard.totalInstallments ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-2xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Quick Overview
          </h3>

          <div className="p-6 text-white rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
            <p className="text-sm">Current Collection</p>

            <h2 className="mt-2 text-4xl font-bold">
              ₹ {(dashboard.totalCollection ?? 0).toLocaleString()}
            </h2>

            <p className="mt-3 text-sm text-green-100">
              Overall business performance looks healthy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
