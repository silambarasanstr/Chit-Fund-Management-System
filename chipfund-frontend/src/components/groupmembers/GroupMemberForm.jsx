import { useEffect, useState } from "react";
import {
  createGroupMember,
  updateGroupMember,
} from "../../services/groupMemberService";
import { toast } from "sonner";

const initialState = {
  group: "",
  member: "",
  joinDate: "",
  status: "Active",
};

export default function GroupMemberForm({
  editData,
  onClose,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editData) {
      setForm({
        group: editData.group?._id || "",
        member: editData.member?._id || "",
        joinDate: editData.joinDate?.split("T")[0] || "",
        status: editData.status || "Active",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await updateGroupMember(editData._id, form);
        toast.success("Updated Successfully");
      } else {
        await createGroupMember(form);
        toast.success("Created Successfully");
      }

      onClose();
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl"
      >
        <h2 className="text-2xl font-bold">
          {editData ? "Edit" : "Add"} Group Member
        </h2>

        <input
          type="text"
          name="group"
          placeholder="Group ID"
          value={form.group}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="member"
          placeholder="Member ID"
          value={form.member}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="date"
          name="joinDate"
          value={form.joinDate}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-white bg-blue-600 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}