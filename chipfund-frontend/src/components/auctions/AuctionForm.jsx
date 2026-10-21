import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createAuction, updateAuction } from "../../services/auctionService";
import { getChitGroups } from "../../services/chitGroupService";

import { getInstallmentGroupId } from "../../services/installmentService";
import { getMembersByGroup } from "../../services/groupMemberService";

import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import Select from "../common/Select";

const initialState = {
  chitGroup: "",
  installmentNo: "",
  auctionDate: "",
  bidAmount: "",
  winner: "",
  status: "Pending",
  remarks: "",
};

export default function AuctionForm({ isOpen, onClose, editData, refresh }) {
  const [form, setForm] = useState(initialState);
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    fetchDropdowns();

    if (editData) {
      setForm({
        chitGroup: editData.chitGroup?._id || "",
        installmentNo: editData.installmentNo || "",
        auctionDate: editData.auctionDate
          ? editData.auctionDate.split("T")[0]
          : "",
        bidAmount: editData.bidAmount || 0,
        winner: editData.winner?._id || "",
        status: editData.status || "Pending",
        remarks: editData.remarks || "",
      });
    } else {
      setForm(initialState);
    }
  }, [isOpen, editData]);

  useEffect(() => {
    if (!form.chitGroup) {
      setMembers([]);
      return;
    }

    const fetchGroupMembers = async () => {
      try {
        const res = await getMembersByGroup(form.chitGroup);

        setMembers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        setMembers([]);
      }
    };

    fetchGroupMembers();
  }, [form.chitGroup]);

  const fetchDropdowns = async () => {
    try {
      const groupRes = await getChitGroups();
      setGroups(groupRes?.data?.data || groupRes?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "chitGroup") {
      setForm((prev) => ({
        ...prev,
        chitGroup: value,
        installmentNo: "",
        winner: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!form.chitGroup) {
      setInstallments([]);
      return;
    }

    const fetchInstallments = async () => {
      try {
        const res = await getInstallmentGroupId(form.chitGroup);
        setInstallments(res?.data?.data || res?.data || []);
      } catch (err) {
        console.error(err);
        setInstallments([]);
      }
    };

    fetchInstallments();
  }, [form.chitGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        chitGroup: form.chitGroup,
        installmentNo: Number(form.installmentNo),
        auctionDate: form.auctionDate,
        bidAmount: Number(form.bidAmount),
        winner: form.winner,
        status: form.status,
        remarks: form.remarks,
      };

      if (editData) {
        await updateAuction(editData._id, payload);
        toast.success("Auction updated successfully");
      } else {
        await createAuction(payload);
        toast.success("Auction created successfully");
      }

      console.log(payload);

      refresh();
      onClose();
      setForm(initialState);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save auction");
    } finally {
      setLoading(false);
    }
  };

  console.log(members);
  console.log(form);

  const selectedGroup = groups.find((group) => group._id === form.chitGroup);

  const totalMembers = members.length;

  const chitAmount = Number(selectedGroup?.chitAmount || 0);

  const prizeAmount = chitAmount - Number(form.bidAmount || 0);

  const dividendPerMember = Number(form.bidAmount || 0) / (totalMembers || 1);

  const uniqueInstallments = installments.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.installmentNo === item.installmentNo),
  );

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
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Chit Group <span className="text-red-500">*</span>
            </label>

            <Select
              name="chitGroup"
              value={form.chitGroup}
              onChange={handleChange}
              required
              options={groups.map((group) => ({
                value: group._id,
                label: group.groupName,
              }))}
            />
          </div>

          <Input
            label="Chit Amount"
            type="number"
            name="chitAmount"
            value={chitAmount}
            readOnly
            required
          />

          {/* Installment */}
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Installment No <span className="text-red-500">*</span>
            </label>

            <Select
              name="installmentNo"
              value={form.installmentNo}
              onChange={handleChange}
              options={uniqueInstallments}
              valueKey="installmentNo"
              labelKey="installmentNo"
              placeholder="Select Installment"
            />
          </div>

          <Input
            label="Auction Date"
            type="date"
            name="auctionDate"
            value={form.auctionDate}
            onChange={handleChange}
            required
          />

          <Input
            label="Bid Amount (Discount)"
            type="number"
            name="bidAmount"
            value={form.bidAmount}
            placeholder="Enter Bid Amount"
            onChange={handleChange}
            min={0}
          />

          <Input
            label="Prize Amount"
            name="prizeAmount"
            value={prizeAmount}
            readOnly
            onChange={handleChange}
          />

          <Input
            label="Dividend Per Member"
            name="dividendPerMember"
            value={dividendPerMember.toFixed(2)}
            onChange={handleChange}
            readOnly
            min={0}
          />

          <div className="md:col-span-2">
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Winner <span className="text-red-500">*</span>
            </label>
            <Select
              name="winner"
              value={form.winner}
              onChange={handleChange}
              options={members.map((item) => ({
                value: item.member._id,
                label: `${item.member.memberId} - ${item.member.name}`,
              }))}
              placeholder="Select Winner"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Status
            </label>

            <Select
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
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
