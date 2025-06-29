const express = require("express");
const router = express.Router();
const {
  redeemCode,
  dashboard,
  deposit,
  test,
} = require("../controllers/dashboard");

router.post("/redeem", redeemCode);
router.get("/dashboard", dashboard);
router.post("/deposit", deposit);
router.get("/test", test);
module.exports = router;
