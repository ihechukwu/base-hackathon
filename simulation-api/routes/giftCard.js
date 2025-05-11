const express = require("express");
const router = express.Router();
const {
  generateCard,
  redeemCard,
  getCards,
} = require("../controllers/giftCards");

router.route("/").get(getCards);
router.route("/redeem").post(redeemCard);
router.route("/generate").post(generateCard);

module.exports = router;
