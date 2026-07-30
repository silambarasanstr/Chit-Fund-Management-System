export const SUCCESS_MESSAGES = {
  // Auth
  REGISTER_SUCCESS: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",

  // Member
  MEMBER_CREATED: "Member created successfully",
  MEMBER_FETCHED: "Member fetched successfully",
  MEMBERS_FETCHED: "Members fetched successfully",
  MEMBER_UPDATED: "Member updated successfully",
  MEMBER_DELETED: "Member deleted successfully",

  // Chit Group
  GROUP_CREATED: "Chit group created successfully",
  GROUP_FETCHED: "Chit group fetched successfully",
  GROUPS_FETCHED: "Chit groups fetched successfully",
  GROUP_UPDATED: "Chit group updated successfully",
  GROUP_DELETED: "Chit group deleted successfully",

  // Auction
  AUCTION_STARTED: "Auction started successfully",
  BID_PLACED: "Bid placed successfully",
  AUCTION_CLOSED: "Auction closed successfully",

  // Payment
  PAYMENT_SUCCESS: "Payment completed successfully",

  // Common
  DATA_FETCHED: "Data fetched successfully",
  OPERATION_SUCCESS: "Operation completed successfully",
};

export const ERROR_MESSAGES = {
  // Auth
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized access",
  ACCESS_DENIED: "Access denied",
  TOKEN_MISSING: "Authentication token is missing",
  TOKEN_INVALID: "Invalid or expired token",

  // User
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User already exists",

  // Member
  MEMBER_NOT_FOUND: "Member not found",
  MEMBER_ALREADY_EXISTS: "Member already exists",

  // Chit Group
  GROUP_NOT_FOUND: "Chit group not found",
  GROUP_ALREADY_EXISTS: "Chit group already exists",

  // Auction
  AUCTION_NOT_FOUND: "Auction not found",
  AUCTION_ALREADY_STARTED: "Auction has already started",
  AUCTION_ALREADY_CLOSED: "Auction has already been closed",
  INVALID_BID: "Invalid bid amount",

  // Payment
  PAYMENT_NOT_FOUND: "Payment not found",

  // Validation
  VALIDATION_ERROR: "Validation failed",

  // Common
  ROUTE_NOT_FOUND: "Route not found",
  SERVER_ERROR: "Internal server error",
  SOMETHING_WENT_WRONG: "Something went wrong",
};

// Success Response
// import ApiResponse from "../utils/ApiResponse.js";
// import { SUCCESS_MESSAGES } from "../constants/messages.js";

// return res.status(200).json(
//   new ApiResponse(
//     200,
//     members,
//     SUCCESS_MESSAGES.MEMBERS_FETCHED
//   )
// );

// Error Response
// import ApiError from "../utils/ApiError.js";
// import { ERROR_MESSAGES } from "../constants/messages.js";

// throw new ApiError(
//   404,
//   ERROR_MESSAGES.MEMBER_NOT_FOUND
// );
