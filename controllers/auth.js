const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();

const register = async (req, res) => {
  try {
    await User.deleteMany({});
    console.log(req.body);
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!emailRegex.test(email) || !password) {
    throw new BadRequestError("provide email or password");
  }
  const user = await User.findOne({ email });
  const isMatch = await user.comparePassword(password);
  if (!user || !isMatch) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const token = user.createToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "success", value: `welcome back ${user.name}` });
};

module.exports = { register, login };
