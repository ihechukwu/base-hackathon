const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const GiftCardSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  redeemed: { type: Boolean, default: false },
  redeemedAt: { type: Date },
});
module.exports = mongoose.model("GiftCard", GiftCardSchema);
