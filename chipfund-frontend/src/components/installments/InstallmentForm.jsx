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
import { getMembersByGroup } from "../../services/groupMemberService";

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

      if (editData.group?._id) {
        fetchMembersByGroup(editData.group._id);
      }
    } else {
      setFormData(initialState);
      setMembers([]);
    }
  }, [editData]);

  const fetchGroups = async () => {
    try {
      const res = await getChitGroups();
      setGroups(res.data?.data || res.data || []);
    } catch (error) {
      toast.error("Failed to load groups");
    }
  };

  const fetchMembersByGroup = async (groupId) => {
    try {
      const res = await getMembersByGroup(groupId);
      setMembers(res.data?.data || res.data || []);
    } catch (error) {
      console.error(error);
      setMembers([]);
      toast.error("Failed to load group members");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "group") {
      setFormData((prev) => ({
        ...prev,
        group: value,
        member: "",
      }));

      if (value) {
        await fetchMembersByGroup(value);
      } else {
        setMembers([]);
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      handleFormClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setFormData(initialState);
    setMembers([]);
    onClose();
  };

  return (
    <Modal
      title={editData ? "Edit Installment" : "Add Installment"}
      isOpen={isOpen}
      onClose={handleFormClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Group */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chit Group
          </label>

          <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Member
          </label>

          <select
            name="member"
            value={formData.member}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.group}
          >
            <option value="">
              {formData.group ? "Select Member" : "Select Group First"}
            </option>

            {members.map((item) => (
              <option key={item._id} value={item.member._id}>
                {item.member.name}
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
          <Button type="button" variant="secondary" onClick={handleFormClose}>
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
