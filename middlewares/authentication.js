const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token || token === "logout") {
    throw new UnauthenticatedError("unauthorized");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("unauthorized");
  }
};
module.exports = auth;
