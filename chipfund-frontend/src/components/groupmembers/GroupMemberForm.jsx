import { useEffect, useState } from "react";
import {
  createGroupMember,
  updateGroupMember,
} from "../../services/groupMemberService";
import { toast } from "sonner";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../../components/common/Button";
import { getChitGroups } from "../../services/chitGroupService";
import { getMembers } from "../../services/memberService";

const initialState = {
  chitGroup: "",
  member: "",
  joinDate: "",
  status: "Active",
};

export default function GroupMemberForm({
  editData,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState(initialState);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchGroups();
      fetchMembers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      setForm({
        chitGroup: editData.chitGroup?._id || "",
        member: editData.member?._id || "",
        joinDate: editData.joinDate?.split("T")[0] || "",
        status: editData.status || "Active",
      });
    } else {
      setForm(initialState);
    }
  }, [editData, isOpen]);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getChitGroups();
      setGroups(res.data || []);
    } catch (error) {
      toast.error("Failed to load groups");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await getMembers();
      setMembers(res.data || []);
    } catch (error) {
      toast.error("Failed to load members");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "Form Data groupMember");
    try {
      if (editData) {
        await updateGroupMember(editData._id, form);
        toast.success("Group Member updated successfully");
      } else {
        await createGroupMember(form);
        toast.success("Group Member created successfully");
      }
      console.log(form, "Form Data groupMember");
      setForm(initialState);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setForm(initialState);
    onClose();
  };

  return (
    <Modal
      title={editData ? "Edit Group Member" : "Add Group Member"}
      isOpen={isOpen}
      onClose={() => {
        setForm(initialState);
        onClose();
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Chit Group</label>

          <select
            name="chitGroup"
            value={form.chitGroup}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Group</option>

            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Member</label>

          <select
            name="member"
            value={form.member}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Join Date"
          type="date"
          name="joinDate"
          value={form.joinDate}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={handleFormClose}>
            Cancel
          </Button>

          <Button type="submit">{editData ? "Update" : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
