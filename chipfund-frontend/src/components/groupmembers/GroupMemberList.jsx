import { Eye, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { deleteGroupMember } from "../../services/groupMemberService";
import Button from "../../components/common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

const statusColors = {
  Upcoming: "bg-yellow-100 text-yellow-700",
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function GroupMemberList({
  loading,
  groupMembers,
  onEdit,
  refresh,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await deleteGroupMember(id);
      toast.success("Deleted Successfully");
      refresh();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  console.log(groupMembers);

  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-2.5 text-left whitespace-nowrap">Group</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Member
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Join Date
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={5} message="Loading group members..." />
            ) : groupMembers.length === 0 ? (
              <NoDataFound
                colSpan={10}
                title="No members found"
                message="There are no members to display."
              />
            ) : (
              groupMembers.map((item) => (
                <tr key={item._id} className="transition hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-700">
                    {item.chitGroup?.groupName || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.member?.name}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.joinedDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[item.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
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

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(item._id)}
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
