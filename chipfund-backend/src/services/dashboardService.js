import User from "../models/User.js";
import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";
import Installment from "../models/Installment.js";
import Payment from "../models/Payment.js";
import Auction from "../models/Auction.js";

export const getDashboard = async () => {
  const [
    totalUsers,
    totalMembers,
    totalGroups,
    totalInstallments,
    totalPayments,
    totalAuctions,
  ] = await Promise.all([
    User.countDocuments(),
    Member.countDocuments(),
    ChitGroup.countDocuments(),
    Installment.countDocuments(),
    Payment.countDocuments(),
    Auction.countDocuments(),
  ]);

  const paymentSummary = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalCollection: { $sum: "$amount" },
      },
    },
  ]);

  const auctionSummary = await Auction.aggregate([
    {
      $group: {
        _id: null,
        totalAuctionAmount: { $sum: "$winningBidAmount" },
      },
    },
  ]);

  return {
    totalUsers,
    totalMembers,
    totalGroups,
    totalInstallments,
    totalPayments,
    totalAuctions,

    totalCollection:
      paymentSummary.length > 0
        ? paymentSummary[0].totalCollection
        : 0,

    totalAuctionAmount:
      auctionSummary.length > 0
        ? auctionSummary[0].totalAuctionAmount
        : 0,
  };
};