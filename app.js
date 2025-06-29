const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authenticateUser = require("./middlewares/authentication");
const authRouter = require("./routers/authRouter");
const dashboardRouter = require("./routers/dashboardRouter");
const connectDB = require("./connect/db");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("working");
});
app.use("/api", authRouter);
app.use("/api", dashboardRouter);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.URI);
    app.listen(PORT, () => {
      console.log("server listening at port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
