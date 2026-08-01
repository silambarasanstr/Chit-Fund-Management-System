import { useEffect, useState } from "react";
import { getChitGroups, deleteChitGroup } from "../services/chitGroupService";
import ChitGroupForm from "../components/chitgroups/ChitGroupForm";
import ChitGroupList from "../components/chitgroups/ChitGroupList";
import Button from "../components/common/Button";
import { toast } from "sonner";

const ChitGroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await getChitGroups();
      setGroups(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this chit group?")) return;

    try {
      await deleteChitGroup(id);
      toast.success("Deleted successfully");
      fetchGroups();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleAdd = () => {
    setEditingGroup(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingGroup(null);
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your members here.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={handleAdd}>
            + Add Chit Group
          </Button>
        </div>
      </div>

      <ChitGroupList
        groups={groups}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ChitGroupForm
        isOpen={isOpen}
        onClose={handleClose}
        editingGroup={editingGroup}
        refresh={fetchGroups}
      />
    </div>
  );
};

export default ChitGroupPage;
