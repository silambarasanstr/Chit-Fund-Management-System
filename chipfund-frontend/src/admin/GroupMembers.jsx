import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getGroupMembers } from "../services/groupMemberService";
import GroupMemberList from "../components/groupmembers/GroupMemberList";
import GroupMemberForm from "../components/groupmembers/GroupMemberForm";
import Button from "../components/common/Button";

export default function GroupMembers() {
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const fetchGroupMembers = async () => {
    try {
      setLoading(true);
      const res = await getGroupMembers();
      setGroupMembers(res?.data?.data || res?.data || []);
    } catch (error) {
      console.error("Fetch Group Members Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch group members",
      );
      setGroupMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  const handleEdit = (member) => {
    setEditingData(member);
    setIsAddGroupModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddGroupModalOpen(false);
    setEditingData(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Group Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your members here.
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setEditingData(null);
              setIsAddGroupModalOpen(true);
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            + Add Group Member
          </Button>
        </div>
      </div>

      <GroupMemberList
        groupMembers={groupMembers}
        refresh={fetchGroupMembers}
        onEdit={handleEdit}
        loading={loading}
      />

      <GroupMemberForm
        editData={editingData}
        isOpen={isAddGroupModalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchGroupMembers}
      />
    </div>
  );
}
