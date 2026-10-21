import React from "react";
import { Eye, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

export default function PaymentList({ payments, loading, onEdit, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-500">
              <th className="px-4 py-3">#</th>

              <th className="px-4 py-3 whitespace-nowrap">Member</th>

              <th className="px-4 py-3 whitespace-nowrap">Group</th>

              <th className="px-4 py-3 whitespace-nowrap">Installment</th>

              <th className="px-4 py-3 whitespace-nowrap">Amount</th>

              <th className="px-4 py-3 whitespace-nowrap">Payment Date</th>

              <th className="px-4 py-3 whitespace-nowrap">Mode</th>

              <th className="px-4 py-3 whitespace-nowrap">Transaction ID</th>

              <th className="px-4 py-3 whitespace-nowrap">Status</th>

              <th className="px-4 py-3 whitespace-nowrap">Remarks</th>

              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={11} message="Loading payments..." />
            ) : payments.length === 0 ? (
              <NoDataFound
                colSpan={11}
                title="No payments found"
                message="There are no payments to display."
              />
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="transition hover:bg-blue-50/40"
                >
                  <td className="px-4 py-3 text-gray-700">0{index + 1}</td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {payment.member?.name}
                  </td>

                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {payment.chitGroup?.groupName}
                  </td>

                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {payment.installment?.installmentNo}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹ {payment.amount}
                  </td>

                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {payment.paymentMode}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {payment.transactionId || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="max-w-xs px-4 py-3 text-gray-700 truncate">
                    {payment.remarks || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(payment)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(payment._id)}
                        className="w-8 h-8 transition-all border-red-200 hover:bg-red-50 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
