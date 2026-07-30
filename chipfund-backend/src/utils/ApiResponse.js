class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;

// Usage
// import ApiResponse from "../utils/ApiResponse.js";
// return res
//   .status(200)
//   .json(new ApiResponse(200, users, "Users fetched successfully"));