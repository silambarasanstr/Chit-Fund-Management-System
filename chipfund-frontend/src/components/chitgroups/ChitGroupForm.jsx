import { useEffect, useState } from "react";
import {
  createChitGroup,
  updateChitGroup,
} from "../../services/chitGroupService";
import { toast } from "sonner";

const initialState = {
  groupName: "",
  chitAmount: "",
  totalMembers: "",
  monthlyInstallment: "",
  durationMonths: "",
  startDate: "",
  status: "Upcoming",
};

const ChitGroupForm = ({ editingGroup, onSuccess, clearEditing }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingGroup) {
      setForm({
        groupName: editingGroup.groupName,
        chitAmount: editingGroup.chitAmount,
        totalMembers: editingGroup.totalMembers,
        monthlyInstallment: editingGroup.monthlyInstallment,
        durationMonths: editingGroup.durationMonths,
        startDate: editingGroup.startDate?.split("T")[0],
        status: editingGroup.status,
      });
    } else {
      setForm(initialState);
    }
  }, [editingGroup]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingGroup) {
        await updateChitGroup(editingGroup._id, form);
        toast.success("Chit Group updated successfully");
      } else {
        await createChitGroup(form);
        toast.success("Chit Group created successfully");
      }

      setForm(initialState);
      onSuccess?.();
      clearEditing?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        {editingGroup ? "Edit Chit Group" : "Create Chit Group"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        <input
          type="text"
          name="groupName"
          placeholder="Group Name"
          value={form.groupName}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          type="number"
          name="chitAmount"
          placeholder="Chit Amount"
          value={form.chitAmount}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          type="number"
          name="totalMembers"
          placeholder="Total Members"
          value={form.totalMembers}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          type="number"
          name="monthlyInstallment"
          placeholder="Monthly Installment"
          value={form.monthlyInstallment}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          type="number"
          name="durationMonths"
          placeholder="Duration (Months)"
          value={form.durationMonths}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="h-10 px-3 text-sm border rounded-lg outline-none md:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="flex gap-2 mt-2 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="h-10 px-5 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : editingGroup ? "Update" : "Create"}
          </button>

          {editingGroup && (
            <button
              type="button"
              onClick={clearEditing}
              className="h-10 px-5 text-sm font-medium text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChitGroupForm;