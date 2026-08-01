import { Eye, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import TableLoader from "../common/TableLoader";
import NoDataFound from "../common/NoDataFound";

export default function BidList({ bids, loading, onEdit, onDelete }) {
  return (
    <div className="p-5 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3">#</th>

              <th className="px-4 py-3">Auction</th>

              <th className="px-4 py-3">Member</th>

              <th className="px-4 py-3">Bid Amount</th>

              <th className="px-4 py-3">Remarks</th>

              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={6} message="Loading bids..." />
            ) : bids.length === 0 ? (
              <NoDataFound
                colSpan={6}
                title="No bids found"
                message="There are no bids to display."
              />
            ) : (
              bids.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.auction?.auctionNo || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.member?.name}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹ {item.bidAmount}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {item.remarks || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(item)}
                        className="w-8 h-8 transition-all border-blue-200 hover:bg-blue-50 hover:border-blue-500"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(item._id)}
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
