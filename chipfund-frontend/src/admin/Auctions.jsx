import { useEffect, useState } from "react";
import AuctionList from "../components/auctions/AuctionList";
import AuctionForm from "../components/auctions/AuctionForm";
import { getAuctions } from "../services/auctionService";
import Button from "../components/common/Button";

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAuctions = async () => {
    try {
      const res = await getAuctions();
      setAuctions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Auctions</h2>
          <p className="text-gray-500">Manage chit auctions</p>
        </div>

        <Button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Auction
        </Button>
      </div>

      <AuctionList
        auctions={auctions}
        loading={loading}
        refresh={fetchAuctions}
        onEdit={(item) => {
          setEditData(item);
          setOpen(true);
        }}
      />

      <AuctionForm
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={editData}
        refresh={fetchAuctions}
      />
    </div>
  );
}
