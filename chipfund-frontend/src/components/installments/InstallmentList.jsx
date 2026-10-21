import React from "react";
import { Eye, Pencil, CreditCard, Trash2, CheckCircle2 } from "lucide-react";
import TableHeader from "../common/TableHeader";
import Button from "../../components/common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

const columns = [
  "S.No",
  "Group",
  "Member",
  "Inst. No",
  "Due Amount",
  "Paid Amount",
  "Status",
  "Remarks",
  "Created",
  "Actions",
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
};

export default function InstallmentList({
  installments,
  loading,
  onEdit,
  onDelete,
  onPay,
}) {
  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <TableHeader columns={columns} />
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader
                colSpan={columns.length}
                message="Loading installments..."
              />
            ) : installments.length === 0 ? (
              <NoDataFound
                colSpan={columns.length}
                title="No installments found"
                message="There are no installments to display."
              />
            ) : (
              installments.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-700">0{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                    {item.group?.groupName}
                  </td>

                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {item.member ? (
                      <>
                        {item.member.name}
                        {item.member.isDeleted && (
                          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            Deleted
                          </span>
                        )}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.installmentNo}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹{item.dueAmount?.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 font-medium text-green-600">
                    ₹{item.paidAmount?.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[item.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.remarks || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(item)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button variant="success" onClick={() => onPay(item)}>
                        Pay
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(item._id)}
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
