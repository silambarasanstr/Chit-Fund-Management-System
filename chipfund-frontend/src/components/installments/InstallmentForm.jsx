import { useEffect, useState } from "react";
import { toast } from "sonner";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../../components/common/Button";

import {
  createInstallment,
  updateInstallment,
} from "../../services/installmentService";

import { getChitGroups } from "../../services/chitGroupService";
import { getMembers } from "../../services/memberService";

const initialState = {
  group: "",
  member: "",
  installmentNo: "",
  dueAmount: "",
  remarks: "",
};

export default function InstallmentForm({
  isOpen,
  onClose,
  editData,
  onSuccess,
}) {
  const [formData, setFormData] = useState(initialState);
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
      setFormData({
        group: editData.group?._id || "",
        member: editData.member?._id || "",
        installmentNo: editData.installmentNo || "",
        dueAmount: editData.dueAmount || "",
        remarks: editData.remarks || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editData]);

  const fetchGroups = async () => {
    try {
      const res = await getChitGroups();
      setGroups(res.data || []);
    } catch (error) {
      toast.error("Failed to load groups");
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await getMembers();
      setMembers(res.data || []);
    } catch (error) {
      toast.error("Failed to load members");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        group: formData.group,
        member: formData.member,
        installmentNo: Number(formData.installmentNo),
        dueAmount: Number(formData.dueAmount),
        remarks: formData.remarks,
      };

      if (editData) {
        await updateInstallment(editData._id, payload);
        toast.success("Installment updated successfully");
      } else {
        await createInstallment(payload);
        toast.success("Installment created successfully");
      }

      onSuccess();
      onClose();
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setFormData(initialState);
    onClose();
  };

  return (
    <Modal
      title={editData ? "Edit Installment" : "Add Installment"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Group */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chit Group
          </label>

          <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            className="w-full px-3 py-2 transition border rounded outline-none"
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

        {/* Member */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Member
          </label>

          <select
            name="member"
            value={formData.member}
            onChange={handleChange}
            className="w-full px-3 py-2 transition border rounded outline-none"
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
          label="Installment No"
          name="installmentNo"
          type="number"
          value={formData.installmentNo}
          onChange={handleChange}
          required
        />

        <Input
          label="Due Amount"
          name="dueAmount"
          type="number"
          value={formData.dueAmount}
          onChange={handleChange}
          required
        />

        <Input
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" onClick={handleFormClose} variant="secondary">
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editData ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
