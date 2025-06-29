const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
