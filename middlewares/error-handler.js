const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong, please try again later",
  };
  if (err.code & (err.code === 11000)) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = "email already taken";
  }
};

module.exports = errorHandlerMiddleware;
