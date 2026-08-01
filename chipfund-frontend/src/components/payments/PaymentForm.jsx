import { useEffect, useState } from "react";
import { toast } from "sonner";

import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

import { createPayment, updatePayment } from "../../services/paymentService";

import { getMembers } from "../../services/memberService";
import { getChitGroups } from "../../services/chitGroupService";
import { getInstallments } from "../../services/installmentService";

const initialState = {
  member: "",
  chitGroup: "",
  installment: "",
  amount: "",
  paymentDate: "",
  paymentMode: "Cash",
  transactionId: "",
  status: "Completed",
  remarks: "",
};

export default function PaymentForm({ editData, isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(initialState);

  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [installments, setInstallments] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        member: editData.member?._id || "",
        chitGroup: editData.chitGroup?._id || "",
        installment: editData.installment?._id || "",
        amount: editData.amount || "",
        paymentDate: editData.paymentDate
          ? editData.paymentDate.split("T")[0]
          : "",
        paymentMode: editData.paymentMode || "Cash",
        transactionId: editData.transactionId || "",
        status: editData.status || "Completed",
        remarks: editData.remarks || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editData, isOpen]);

  const fetchDropdowns = async () => {
    try {
      const [memberRes, groupRes, installmentRes] = await Promise.all([
        getMembers(),
        getChitGroups(),
        getInstallments(),
      ]);

      setMembers(memberRes.data || []);
      setGroups(groupRes.data || []);
      setInstallments(installmentRes.data || []);
    } catch (err) {
      toast.error("Failed to load dropdown data");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.member || !form.chitGroup || !form.installment || !form.amount) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      if (editData) {
        await updatePayment(editData._id, form);
        toast.success("Payment updated successfully");
      } else {
        await createPayment(form);
        toast.success("Payment created successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Payment" : "Add Payment"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Member */}
          <div>
            <label className="block mb-1 text-sm font-medium">Member</label>
            <select
              name="member"
              value={form.member}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chit Group */}
          <div>
            <label className="block mb-1 text-sm font-medium">Chit Group</label>
            <select
              name="chitGroup"
              value={form.chitGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
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
              Installment
            </label>
            <select
              name="installment"
              value={form.installment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Installment</option>
              {installments.map((item) => (
                <option key={item._id} value={item._id}>
                  Installment {item.installmentNo}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <Input
            label="Payment Date"
            type="date"
            name="paymentDate"
            value={form.paymentDate}
            onChange={handleChange}
          />

          {/* Payment Mode */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={form.paymentMode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
            </select>
          </div>

          <Input
            label="Transaction ID"
            name="transactionId"
            value={form.transactionId}
            onChange={handleChange}
          />

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          {/* Remarks - Full Width */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Remarks</label>
            <textarea
              rows={3}
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter remarks"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editData
                ? "Update Payment"
                : "Create Payment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
