import { useEffect, useState } from "react";
import { getChitGroups, deleteChitGroup } from "../services/chitGroupService";
import ChitGroupForm from "../components/chitgroups/ChitGroupForm";
import ChitGroupList from "../components/chitgroups/ChitGroupList";
// import toast from "react-hot-toast";
import { toast } from "sonner";

const ChitGroupPage = () => {
  const [groups, setGroups] = useState([]);
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

  return (
    <>
      <ChitGroupForm
        editingGroup={editingGroup}
        onSuccess={fetchGroups}
        clearEditing={() => setEditingGroup(null)}
      />

      <div className="mt-6">
        <ChitGroupList
          groups={groups}
          loading={loading}
          onEdit={setEditingGroup}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default ChitGroupPage;
