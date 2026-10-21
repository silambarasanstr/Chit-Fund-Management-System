import { Pencil, Trash2 } from "lucide-react";
import Button from "../../components/common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

const statusColors = {
  Upcoming: "bg-yellow-100 text-yellow-700",
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const ChitGroupList = ({ groups = [], loading = false, onEdit, onDelete }) => {
  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2.5 text-left whitespace-nowrap">S:No</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Group Name
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Chit Amount
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Members
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Monthly
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Duration
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Start Date
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={10} message="Loading chit groups..." />
            ) : groups.length === 0 ? (
              <NoDataFound
                colSpan={10}
                title="No chit groups found"
                message="There are no chit groups to display."
              />
            ) : (
              groups.map((group, index) => (
                <tr key={group._id} className="transition hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-700">0{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {group.groupName}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    ₹ {group.chitAmount.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {group.totalMembers}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    ₹ {group.monthlyInstallment.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {group.durationMonths} Months
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {new Date(group.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[group.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(group)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(group._id)}
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
};

export default ChitGroupList;
