import User from "../models/User.js";
import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";
import Installment from "../models/Installment.js";
import Payment from "../models/Payment.js";
import Auction from "../models/Auction.js";

export const getDashboard = async () => {
  const totalUsers = await User.countDocuments();
  const totalMembers = await Member.countDocuments();
  const totalGroups = await ChitGroup.countDocuments();
  const totalInstallments = await Installment.countDocuments();
  const totalPayments = await Payment.countDocuments();
  const totalAuctions = await Auction.countDocuments();

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

  const totalCollection =
    paymentSummary.length > 0 ? paymentSummary[0].totalCollection : 0;

  const totalAuctionAmount =
    auctionSummary.length > 0 ? auctionSummary[0].totalAuctionAmount : 0;

  return {
    totalUsers,
    totalMembers,
    totalGroups,
    totalInstallments,
    totalPayments,
    totalAuctions,
    totalCollection,
    totalAuctionAmount,
  };
};
