import { useEffect, useState } from "react";
import { toast } from "sonner";

import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

import { createAuction, updateAuction } from "../../services/auctionService";

import { getChitGroups } from "../../services/chitGroupService";
import { getInstallments } from "../../services/installmentService";
import { getMembersByGroup } from "../../services/groupMemberService";

const initialState = {
  chitGroup: "",
  installment: "",
  auctionDate: "",
  winner: "",
  winningBid: 0,
  dividendPerMember: 0,
  status: "Pending",
  remarks: "",
};

export default function AuctionForm({ isOpen, onClose, editData, refresh }) {
  const [form, setForm] = useState(initialState);

  const [groups, setGroups] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    fetchDropdowns();

    if (editData) {
      setForm({
        chitGroup: editData.chitGroup?._id || "",
        installment: editData.installment?._id || "",
        auctionDate: editData.auctionDate
          ? editData.auctionDate.split("T")[0]
          : "",
        winner: editData.winner?._id || "",
        winningBid: editData.winningBid || 0,
        dividendPerMember: editData.dividendPerMember || 0,
        status: editData.status || "Pending",
        remarks: editData.remarks || "",
      });

      if (editData.chitGroup?._id) {
        fetchGroupMembers(editData.chitGroup._id);
      }
    } else {
      setForm(initialState);

      setGroupMembers([]);
    }
  }, [isOpen, editData]);

  const fetchDropdowns = async () => {
    try {
      const groupRes = await getChitGroups();

      setGroups(groupRes?.data?.data || groupRes?.data || []);

      const installmentRes = await getInstallments();

      setInstallments(installmentRes?.data?.data || installmentRes?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data");
    }
  };

  const fetchGroupMembers = async (groupId) => {
    if (!groupId) {
      setGroupMembers([]);
      return;
    }

    try {
      const res = await getMembersByGroup(groupId);
      setGroupMembers(res?.data || []);
    } catch (err) {
      console.error(err);
      setGroupMembers([]);
      toast.error("Failed to load group members");
    }
  };

  console.log(groupMembers);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "chitGroup") {
      setForm((prev) => ({
        ...prev,
        chitGroup: value,
        winner: "",
      }));

      fetchGroupMembers(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editData) {
        await updateAuction(editData._id, form);
        toast.success("Auction updated successfully");
      } else {
        await createAuction(form);
        toast.success("Auction created successfully");
      }
      setForm(initialState);
      setGroupMembers([]);
      if (refresh) {
        await refresh();
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Auction" : "Add Auction"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Chit Group */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Chit Group <span className="text-red-500">*</span>
            </label>

            <select
              name="chitGroup"
              value={form.chitGroup}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Group</option>

              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>

          {/* Installment */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Installment <span className="text-red-500">*</span>
            </label>

            <select
              name="installment"
              value={form.installment}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Installment</option>

              {installments
                .filter(
                  (item) =>
                    !form.chitGroup ||
                    item.chitGroup === form.chitGroup ||
                    item.chitGroup?._id === form.chitGroup,
                )
                .map((item) => (
                  <option key={item._id} value={item._id}>
                    Installment #{item.installmentNo}
                  </option>
                ))}
            </select>
          </div>

          <Input
            label="Auction Date"
            type="date"
            name="auctionDate"
            value={form.auctionDate}
            onChange={handleChange}
            required
          />

          {/* Winner */}
          <div>
            <label className="block mb-1 text-sm font-medium">Winner</label>

            <select
              name="winner"
              value={form.winner}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Winner</option>

              {groupMembers.map((item) => (
                <option key={item.member._id} value={item.member._id}>
                  {item.member.memberId} - {item.member.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Winning Bid"
            type="number"
            name="winningBid"
            value={form.winningBid}
            onChange={handleChange}
            min={0}
          />

          <Input
            label="Dividend Per Member"
            type="number"
            name="dividendPerMember"
            value={form.dividendPerMember}
            onChange={handleChange}
            min={0}
          />

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Remarks</label>

          <textarea
            rows={3}
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Enter remarks..."
            className="w-full px-3 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" loading={loading}>
            {editData ? "Update Auction" : "Create Auction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
