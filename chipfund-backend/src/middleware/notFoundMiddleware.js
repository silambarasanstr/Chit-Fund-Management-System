import {HTTP_STATUS} from "../constants/httpStatus.js";
import ApiError from "../utils/ApiError.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

const notFoundMiddleware = (req, res, next) => {
  next(
    new ApiError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_MESSAGES.ROUTE_NOT_FOUND
    )
  );
};

export default notFoundMiddleware;