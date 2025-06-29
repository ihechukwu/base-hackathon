const { match } = require("assert");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// creating a user schema in database
const UserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// hash the password before storing in database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create a jwt token for logging in
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this.id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// means of verifying password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
