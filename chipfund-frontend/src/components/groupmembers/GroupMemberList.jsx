import { deleteGroupMember } from "../../services/groupMemberService";
import { toast } from "sonner";

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

  if (loading) return <p className="py-10 text-center">Loading...</p>;

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Group</th>
            <th className="p-3">Member</th>
            <th className="p-3">Join Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {groupMembers.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-3">{item.chitGroup.groupName}</td>

              <td className="p-3">{item.member?.name}</td>

              <td className="p-3">
                {new Date(item.joinDate).toLocaleDateString()}
              </td>

              <td className="p-3">{item.status}</td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 text-white bg-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {groupMembers.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No Group Members Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
