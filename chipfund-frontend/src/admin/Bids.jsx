import { useEffect, useState } from "react";
import { toast } from "sonner";

import Button from "../components/common/Button";
import BidList from "../components/bid/BidList";
import BidForm from "../components/bid/BidForm";

import {
  getBids,
  deleteBid,
} from "../services/bidService";

export default function Bids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const res = await getBids();
      setBids(res.data.data || res.data);
    } catch {
      toast.error("Failed to load bids");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bid?")) return;

    try {
      await deleteBid(id);
      toast.success("Bid deleted");
      fetchBids();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-2xl font-bold">
            Bid Management
          </h2>

          <p className="text-gray-500">
            Manage all auction bids
          </p>

        </div>

        <Button
          onClick={() => {
            setEditData(null);
            setIsOpen(true);
          }}
        >
          + Add Bid
        </Button>

      </div>

      <BidList
        bids={bids}
        loading={loading}
        onEdit={(item) => {
          setEditData(item);
          setIsOpen(true);
        }}
        onDelete={handleDelete}
      />

      <BidForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editData={editData}
        onSuccess={fetchBids}
      />

    </div>
  );
}