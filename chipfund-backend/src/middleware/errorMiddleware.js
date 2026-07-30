import {HTTP_STATUS} from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const message =
    err.message || "Internal Server Error";

  return res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      null,
      message
    )
  );
};

export default errorMiddleware;