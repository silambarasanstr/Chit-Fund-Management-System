import { Pencil, Trash2 } from "lucide-react";

const statusColors = {
  Upcoming: "bg-yellow-100 text-yellow-700",
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const ChitGroupList = ({
  groups = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="p-6 text-center bg-white shadow rounded-xl">
        Loading chit groups...
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white shadow rounded-xl">
        No chit groups found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-4 py-3">Group Name</th>
            <th className="px-4 py-3">Chit Amount</th>
            <th className="px-4 py-3">Members</th>
            <th className="px-4 py-3">Monthly</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.map((group) => (
            <tr
              key={group._id}
              className="transition border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">
                {group.groupName}
              </td>

              <td className="px-4 py-3">
                ₹ {group.chitAmount.toLocaleString()}
              </td>

              <td className="px-4 py-3">
                {group.totalMembers}
              </td>

              <td className="px-4 py-3">
                ₹ {group.monthlyInstallment.toLocaleString()}
              </td>

              <td className="px-4 py-3">
                {group.durationMonths} Months
              </td>

              <td className="px-4 py-3">
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
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(group)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(group._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChitGroupList;