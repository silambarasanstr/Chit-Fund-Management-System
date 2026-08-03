import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { updateMember, createMember } from "../../services/memberService";
import { getUsers } from "../../features/auth/authService";

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
      const availableUsers = res.data.filter((user) => !user.member);
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
          <select
            name="user"
            value={form.user}
            onChange={handleChange}
            className="w-full px-3 py-2 transition border border-gray-300 rounded outline-none md:col-span-2"
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <Input
            label="Member ID"
            name="memberId"
            value={form.memberId}
            onChange={handleChange}
            placeholder="Enter member ID"
          />

          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter member name"
            required
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter member email"
            required
          />

          <Input
            label="Phone"
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter member phone"
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Address"
              name="address"
              value={form.address}
              placeholder="Enter member address"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
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
