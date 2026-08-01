import { useEffect, useState } from "react";
import { toast } from "sonner";

import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

import {
  createBid,
  updateBid,
} from "../../services/bidService";

import { getAuctions } from "../../services/auctionService";
import { getMembers } from "../../services/memberService";

const initialState = {
  auction: "",
  member: "",
  bidAmount: "",
  remarks: "",
};

export default function BidForm({
  isOpen,
  onClose,
  editData,
  onSuccess,
}) {
  const [form, setForm] = useState(initialState);
  const [auctions, setAuctions] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (editData) {
      setForm({
        auction: editData.auction?._id || "",
        member: editData.member?._id || "",
        bidAmount: editData.bidAmount,
        remarks: editData.remarks || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [auctionRes, memberRes] = await Promise.all([
        getAuctions(),
        getMembers(),
      ]);

      setAuctions(auctionRes.data || auctionRes.data);
      setMembers(memberRes.data || memberRes.data);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

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
        await updateBid(editData._id, form);
        toast.success("Bid updated");
      } else {
        await createBid(form);
        toast.success("Bid created");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      title={`${editData ? "Edit" : "Add"} Bid`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 text-sm font-medium">
            Auction
          </label>

          <select
            name="auction"
            value={form.auction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Auction</option>

            {auctions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.auctionNo || item._id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Member
          </label>

          <select
            name="member"
            value={form.member}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Member</option>

            {members.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Bid Amount"
          name="bidAmount"
          type="number"
          value={form.bidAmount}
          onChange={handleChange}
          required
        />

        <Input
          label="Remarks"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            {editData ? "Update" : "Save"}
          </Button>

        </div>
      </form>
    </Modal>
  );
}