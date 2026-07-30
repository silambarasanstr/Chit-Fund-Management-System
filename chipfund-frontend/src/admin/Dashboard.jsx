import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import {
  Users,
  UserCheck,
  Layers3,
  CalendarDays,
  CreditCard,
  Gavel,
  Wallet,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Total Members",
      value: dashboard.totalMembers,
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Chit Groups",
      value: dashboard.totalGroups,
      icon: Layers3,
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Installments",
      value: dashboard.totalInstallments,
      icon: CalendarDays,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Payments",
      value: dashboard.totalPayments,
      icon: CreditCard,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Auctions",
      value: dashboard.totalAuctions,
      icon: Gavel,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Total Collection",
      value: `₹ ${dashboard.totalCollection}`,
      icon: Wallet,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Auction Amount",
      value: `₹ ${dashboard.totalAuctionAmount}`,
      icon: IndianRupee,
      color: "from-blue-500 to-blue-600",
    },
  ];

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      if (res.success) {
        setDashboard(res.data);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back 👋 Here's your business overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="p-5 transition-all duration-300 bg-white border border-gray-300 rounded-md shadow cursor-pointer group hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r ${item.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
