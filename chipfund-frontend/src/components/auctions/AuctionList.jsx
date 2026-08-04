import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteAuction } from "../../services/auctionService";

import Button from "../common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

export default function AuctionList({
  auctions = [],
  loading = false,
  onEdit,
  refresh,
}) {
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuction(id);
      toast.success("Auction deleted successfully.");
      await refresh();
    } catch (error) {
      console.error("Error deleting auction:", error);
      toast.error("Failed to delete auction.");
    }
  };

  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3 whitespace-nowrap">#</th>
              <th className="px-4 py-3 whitespace-nowrap">Group</th>
              <th className="px-4 py-3 whitespace-nowrap">Installment</th>
              <th className="px-4 py-3 whitespace-nowrap">Auction Date</th>
              <th className="px-4 py-3 whitespace-nowrap">Winner</th>
              <th className="px-4 py-3 whitespace-nowrap">Winning Bid</th>
              <th className="px-4 py-3 whitespace-nowrap">Dividend / Member</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={9} message="Loading auctions..." />
            ) : auctions.length === 0 ? (
              <NoDataFound
                colSpan={9}
                title="No auctions found"
                message="There are no auctions to display."
              />
            ) : (
              auctions.map((auction, index) => (
                <tr
                  key={auction._id}
                  className="transition hover:bg-blue-50/40"
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>

                  <td className="px-4 py-3 text-gray-700">
                    {auction.chitGroup?.groupName || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {auction.installment?.installmentNo
                      ? `#${auction.installment.installmentNo}`
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(auction.auctionDate)}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {auction.winner
                      ? `${auction.winner.memberId} - ${auction.winner.name}`
                      : "-"}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹{formatAmount(auction.winningBid)}
                  </td>

                  <td className="px-4 py-3 font-medium text-green-600">
                    ₹{formatAmount(auction.dividendPerMember)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        auction.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : auction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit?.(auction)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(auction._id)}
                        className="w-8 h-8 transition-all border-red-200 hover:bg-red-50 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
