class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

// Usage
// import ApiError from "../utils/ApiError.js";
// throw new ApiError(404, "User not found", ["User not found"]);
// throw new ApiError(404, "Member not found");
