import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getGroupMembers,
  getMembersByGroup,
} from "../services/groupMemberService";

import { getChitGroups } from "../services/chitGroupService";

import GroupMemberList from "../components/groupmembers/GroupMemberList";
import GroupMemberForm from "../components/groupmembers/GroupMemberForm";
import Button from "../components/common/Button";
import StatusFilter from "../components/common/StatusFilter";

export default function GroupMembers() {
  const [groupMembers, setGroupMembers] = useState([]);
  const [chitGroups, setChitGroups] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");

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

  const handleGroupChange = async (groupId) => {
    setSelectedGroup(groupId);

    try {
      if (!groupId) {
        await fetchGroupMembers();
        return;
      }

      const res = await getMembersByGroup(groupId);
      setGroupMembers(res?.data?.data || res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChitGroups = async () => {
    try {
      const res = await getChitGroups();
      setChitGroups(res?.data?.data || res?.data || []);
    } catch (error) {
      console.error("Fetch Chit Groups Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch chit groups",
      );
      setChitGroups([]);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
    fetchChitGroups();
  }, []);

  const handleEdit = (member) => {
    setEditingData(member);
    setIsAddGroupModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddGroupModalOpen(false);
    setEditingData(null);
  };

  const groupOptions = chitGroups.map((group) => ({
    value: group._id,
    label: group.groupName,
  }));

  console.log(groupMembers)
  console.log(chitGroups)

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
            
          >
            + Add Group Member
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between">
        <StatusFilter
          label="Chit Group"
          value={selectedGroup}
          options={groupOptions}
          onChange={handleGroupChange}
        />
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
