import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";
import Installment from "../models/Installment.js";
import Payment from "../models/Payment.js";
import Auction from "../models/Auction.js";
import Bid from "../models/Bid.js";

// ======================================
// Dashboard Report
// ======================================
export const getDashboardReport = async () => {
  const [
    totalMembers,
    totalGroups,
    totalInstallments,
    totalPayments,
    totalAuctions,
    totalBids,
  ] = await Promise.all([
    Member.countDocuments(),
    ChitGroup.countDocuments(),
    Installment.countDocuments(),
    Payment.countDocuments(),
    Auction.countDocuments(),
    Bid.countDocuments(),
  ]);

  const paymentSummary = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalCollection: { $sum: "$amount" },
      },
    },
  ]);

  return {
    totalMembers,
    totalGroups,
    totalInstallments,
    totalPayments,
    totalAuctions,
    totalBids,
    totalCollection: paymentSummary[0]?.totalCollection || 0,
  };
};

// ======================================
// Member Report
// ======================================
export const getMemberReport = async () => {
  const totalMembers = await Member.countDocuments();

  const activeMembers = await Member.countDocuments({
    status: "Active",
  });

  const inactiveMembers = await Member.countDocuments({
    status: "Inactive",
  });

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
  };
};

// ======================================
// Group Report
// ======================================
export const getGroupReport = async () => {
  const totalGroups = await ChitGroup.countDocuments();

  const activeGroups = await ChitGroup.countDocuments({
    status: "Active",
  });

  const completedGroups = await ChitGroup.countDocuments({
    status: "Completed",
  });

  return {
    totalGroups,
    activeGroups,
    completedGroups,
  };
};

// ======================================
// Payment Report
// ======================================
export const getPaymentReport = async () => {
  const payments = await Payment.find()
    .populate("member", "name")
    .populate("group", "groupName")
    .sort({ createdAt: -1 });

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return {
    totalPayments: payments.length,
    totalAmount,
    payments,
  };
};

// ======================================
// Auction Report
// ======================================
export const getAuctionReport = async () => {
  const auctions = await Auction.find()
    .populate("group", "groupName")
    .populate("winner", "name")
    .sort({ createdAt: -1 });

  return {
    totalAuctions: auctions.length,
    auctions,
  };
};