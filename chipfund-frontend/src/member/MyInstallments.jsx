import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  IndianRupee,
} from "lucide-react";
import { getMyInstallments } from "../services/installmentService";

const MyInstallments = () => {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstallments();
  }, []);

  const fetchInstallments = async () => {
    try {
      const res = await getMyInstallments();
      setInstallments(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = installments
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + (i.paidAmount || 0), 0);

  const pending = installments.filter(
    (i) => i.status === "pending"
  ).length;

  const paid = installments.filter(
    (i) => i.status === "paid"
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading installments...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Installments
        </h1>
        <p className="text-sm text-gray-500">
          View your installment payment history.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Installments"
          value={installments.length}
          color="bg-blue-100 text-blue-600"
          icon={<Calendar size={22} />}
        />

        <Card
          title="Paid"
          value={paid}
          color="bg-green-100 text-green-600"
          icon={<CheckCircle size={22} />}
        />

        <Card
          title="Pending"
          value={pending}
          color="bg-orange-100 text-orange-600"
          icon={<Clock size={22} />}
        />

        <Card
          title="Total Paid"
          value={`₹${totalPaid.toLocaleString()}`}
          color="bg-purple-100 text-purple-600"
          icon={<IndianRupee size={22} />}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">
                <th className="px-4 py-3">Installment</th>
                <th className="px-4 py-3">Group</th>
                <th className="px-4 py-3">Due Amount</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {installments.length > 0 ? (
                installments.map((item) => (
                  <tr
                    key={item._id}
                    className="transition-colors border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      #{item.installmentNo}
                    </td>

                    <td className="px-4 py-3">
                      {item.group?.groupName || "-"}
                    </td>

                    <td className="px-4 py-3 font-semibold text-gray-800">
                      ₹{(item.dueAmount || 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 font-semibold text-green-600">
                      ₹{(item.paidAmount || 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          item.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {item.paymentDate
                        ? new Date(item.paymentDate).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {item.remarks || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-500"
                  >
                    No installments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-800">
          {value}
        </h2>
      </div>

      <div className={`rounded-lg p-3 ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default MyInstallments;