const { match } = require("assert");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "provide email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      "provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "provide password"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this.id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: LIFE_TIME }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
