import { useEffect, useState } from "react";
import { CreditCard, IndianRupee, Calendar } from "lucide-react";
import { getMyPayments } from "../services/paymentService";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getMyPayments();
      setPayments(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = payments.reduce((sum, item) => sum + (item.amount || 0), 0);

  const lastPayment =
    payments.length > 0 && payments[0].paymentDate
      ? new Date(payments[0].paymentDate).toLocaleDateString("en-IN")
      : "-";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Payments</h1>
        <p className="text-sm text-gray-500">View your payment history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Total Paid"
          value={`₹${totalPaid.toLocaleString()}`}
          icon={<IndianRupee size={22} />}
          color="bg-green-100 text-green-600"
        />

        <Card
          title="Payments"
          value={payments.length}
          icon={<CreditCard size={22} />}
          color="bg-blue-100 text-blue-600"
        />

        <Card
          title="Last Payment"
          value={lastPayment}
          icon={<Calendar size={22} />}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">
                <th className="px-4 py-3">Group</th>
                <th className="px-4 py-3">Installment</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Mode</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="transition-colors border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {payment.chitGroup?.groupName || "-"}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      #{payment.installment?.installmentNo || "-"}
                    </td>

                    <td className="px-4 py-3 font-semibold text-green-600">
                      ₹{(payment.amount || 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {payment.paymentMode || "-"}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {payment.transactionId || "-"}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString(
                            "en-IN",
                          )
                        : "-"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          payment.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {payment.remarks || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No payment history found.
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
  <div className="p-5 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-800">{value}</h2>
      </div>

      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </div>
);

export default MyPayments;
