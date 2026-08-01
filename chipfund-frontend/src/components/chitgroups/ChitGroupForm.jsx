import { useEffect, useState } from "react";
import {
  createChitGroup,
  updateChitGroup,
} from "../../services/chitGroupService";
import { toast } from "sonner";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../common/Modal";

const initialState = {
  groupName: "",
  chitAmount: "",
  totalMembers: "",
  monthlyInstallment: "",
  durationMonths: "",
  startDate: "",
  status: "Upcoming",
};

const ChitGroupForm = ({ editingGroup, isOpen, onClose, refresh }) => {
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

      console.log(form, "Form Data chit group");

      setForm(initialState);
      if (refresh) {
        await refresh();
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
      title={editingGroup ? "Edit Chit Group" : "Create Chit Group"}
      isOpen={isOpen}
      onClose={() => {
        setForm(initialState);
        onClose();
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Group Name"
            name="groupName"
            placeholder="Group Name"
            value={form.groupName}
            onChange={handleChange}
            required
          />

          <Input
            label="Chit Amount"
            type="number"
            name="chitAmount"
            placeholder="Chit Amount"
            value={form.chitAmount}
            onChange={handleChange}
            required
          />

          <Input
            label="Total Members"
            type="number"
            name="totalMembers"
            placeholder="Total Members"
            value={form.totalMembers}
            onChange={handleChange}
            required
          />

          <Input
            label="Monthly Installment"
            type="number"
            name="monthlyInstallment"
            placeholder="Monthly Installment"
            value={form.monthlyInstallment}
            onChange={handleChange}
            required
          />

          <Input
            label="Duration (Months)"
            type="number"
            name="durationMonths"
            placeholder="Duration (Months)"
            value={form.durationMonths}
            onChange={handleChange}
            required
          />

          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="text-gray-400"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 transition border border-gray-300 rounded outline-none md:col-span-2"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" type="button" onClick={handleFormClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingGroup ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChitGroupForm;
