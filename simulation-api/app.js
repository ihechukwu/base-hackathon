const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const giftCards = require("./routes/giftCard");
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://base-hackathon-tau.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use("/api", giftCards);

const start = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

/* 

example of post data
{
  "count": 50,
  "minValue": 50,
  "maxValue": 150,
  "expiresInDays": 90
}
*/
