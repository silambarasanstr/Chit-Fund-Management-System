import { useEffect, useState } from "react";
import { getGroupMembers } from "../services/groupMemberService";
import GroupMemberList from "../components/groupmembers/GroupMemberList";
import GroupMemberForm from "../components/groupmembers/GroupMemberForm";

export default function GroupMembers() {
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const fetchGroupMembers = async () => {
    try {
      setLoading(true);
      const res = await getGroupMembers();
      setGroupMembers(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Group Members</h1>

        <button
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          Add Group Member
        </button>
      </div>

      <GroupMemberList
        loading={loading}
        groupMembers={groupMembers}
        onEdit={(item) => {
          setEditingData(item);
          setOpen(true);
        }}
        refresh={fetchGroupMembers}
      />

      {open && (
        <GroupMemberForm
          editData={editingData}
          onClose={() => {
            setOpen(false);
            fetchGroupMembers();
          }}
        />
      )}
    </div>
  );
}
