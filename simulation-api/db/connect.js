const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database!");
  });
};

module.exports = connectDb;
