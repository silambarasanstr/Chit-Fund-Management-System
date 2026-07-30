const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;

// Usage
// import asyncHandler from "../utils/asyncHandler.js";
// const getUsers = asyncHandler(async (req, res) => {
//   // Your logic here
// });

// export const getMembers = async (req, res) => {
//   try {
//     const members = await Member.find();

//     res.status(200).json({
//       success: true,
//       data: members,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// import asyncHandler from "../utils/asyncHandler.js";
// import ApiResponse from "../utils/ApiResponse.js";

// export const getMembers = asyncHandler(async (req, res) => {
//   const members = await Member.find();

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       members,
//       "Members fetched successfully"
//     )
//   );
// });
