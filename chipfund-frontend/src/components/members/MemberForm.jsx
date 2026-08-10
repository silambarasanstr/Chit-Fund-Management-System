import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { updateMember, createMember } from "../../services/memberService";
import { getUsers } from "../../features/auth/authService";
import Select from "../common/Select";

const initialState = {
  user: "",
  memberId: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "Active",
};

const MemberForm = ({ editData, isOpen, onClose, refresh }) => {
  const [form, setForm] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await getUsers();

      console.log("All Users:", res.data);

      const availableUsers = res.data.filter((user) => !user.member);

      console.log("Available Users:", availableUsers);

      setUsers(availableUsers);
    };

    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (editData) {
        await updateMember(editData._id, form);
        toast.success("Member updated successfully");
      } else {
        await createMember(form);
        toast.success("Member created successfully");
      }
      setForm(initialState);

      if (refresh) {
        await refresh();
      }
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Error saving member");
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setForm(initialState);
    onClose();
  };

  useEffect(() => {
    if (editData) {
      setForm({
        user: editData.user?._id || editData.user || "",
        memberId: editData.memberId || "",
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        address: editData.address || "",
        status: editData.status || "Active",
      });
    } else {
      setForm(initialState);
    }
  }, [editData]);

  const handleQuickSave = () => {
    const nextNumber = 12; // Replace with actual next number from backend

    setForm((prev) => ({
      ...prev,
      memberId: prev.memberId || `MEM${String(nextNumber).padStart(3, "0")}`,
      name: prev.name || `Member ${nextNumber}`,
      email: prev.email || `member${nextNumber}@gmail.com`,
      phone: prev.phone || `987654${String(nextNumber).padStart(4, "0")}`,
      address: prev.address || "Chennai, Tamil Nadu",
      status: prev.status || "Active",
    }));
  };

  return (
    <Modal
      title={editData ? "Edit Member" : "Add Member"}
      isOpen={isOpen}
      onClose={() => {
        setForm(initialState);
        onClose();
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-700">
              User <span className="text-red-500">*</span>
            </label>
            <Select
              name="user"
              value={form.user}
              onChange={handleChange}
              placeholder="Select a user"
              options={users.map((user) => ({
                value: user._id,
                label: `${user.name} (${user.email})`,
              }))}
            />
          </div>

          <Input
            label="Member ID"
            name="memberId"
            value={form.memberId}
            onChange={handleChange}
            placeholder="e.g. MEM001"
          />

          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Suresh"
            required
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. suresh@example.com"
            required
          />

          <Input
            label="Phone"
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Address"
              name="address"
              value={form.address}
              placeholder="e.g. 123 Main Street"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleQuickSave}>
            Quick Save
          </Button>
          <Button variant="secondary" type="button" onClick={handleFormClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MemberForm;
