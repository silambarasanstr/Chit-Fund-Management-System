import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { deleteMember, bulkDeleteMembers } from "../../services/memberService";
import Button from "../../components/common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

const MemberList = ({ members, loading, onView, onEdit, refresh }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?",
    );

    if (!confirmed) return;

    try {
      await deleteMember(id);
      toast.success("Member deleted successfully");
      await refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete member");
    }
  };

  const handleSelectMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMembers(members.map((member) => member._id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member.");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete ${selectedMembers.length} selected member(s)?`,
    );

    if (!confirmDelete) return;

    try {
      const res = await bulkDeleteMembers(selectedMembers);

      toast.success(res?.message || "Selected members deleted successfully.");

      setSelectedMembers([]);

      await refresh(); // Refresh table
    } catch (error) {
      toast.error(error.response?.data?.message || "Bulk delete failed.");
    }
  };

  const allSelected =
    members.length > 0 && selectedMembers.length === members.length;

  const isIndeterminate =
    selectedMembers.length > 0 && selectedMembers.length < members.length;

  useEffect(() => {
    setSelectedMembers([]);
  }, [members]);

  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 mb-4 border border-blue-200 rounded-xl bg-blue-50">
        <div className="flex items-center gap-2">
          <RefreshCcw size={15} />

          <span className="text-sm font-medium text-blue-700">
            {selectedMembers.length} member
            {selectedMembers.length !== 1 ? "s" : ""} selected
          </span>
        </div>

        {selectedMembers.length > 0 && (
          <Button
            variant="danger"
            size={"sm"}
            onClick={handleBulkDelete}
            disabled={loading}
          >
            <Trash2 size={15} />
            Delete Selected
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                <input
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">S:No</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">Name</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Member ID
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">Email</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">Phone</th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Address
              </th>
              <th className="px-4 py-2.5 text-left whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={10} message="Loading members..." />
            ) : members.length === 0 ? (
              <NoDataFound
                colSpan={10}
                title="No members found"
                message="There are no members to display."
              />
            ) : (
              members.map((member, index) => (
                <tr key={member._id} className="transition hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-700">
                    <input
                      aria-label="Select all members"
                      type="checkbox"
                      checked={selectedMembers.includes(member._id)}
                      onChange={() => handleSelectMember(member._id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-700">0{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-blue-600">{member.memberId}</td>
                  <td className="px-4 py-3 text-gray-700">{member.email}</td>
                  <td className="px-4 py-3 text-gray-700">{member.phone}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {member.address || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[member.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(member)}
                        className="w-8 h-8 transition-all duration-200 border-gray-200 hover:bg-gray-50 hover:border-gray-500"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(member)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(member._id)}
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

export default MemberList;
