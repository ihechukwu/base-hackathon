const GiftCard = require("../models/GiftCard");
const { nanoid } = require("nanoid");

const generateCard = async (req, res) => {
  try {
    const {
      count = 1,
      minValue = 10,
      maxValue = 100,
      expiresInDays = 30,
    } = req.body;
    const giftCards = [];

    for (let i = 0; i < count; i++) {
      const code = nanoid(10).toUpperCase(); // Unique 10-char code
      const value =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      const expiresAt = new Date(
        Date.now() + expiresInDays * 24 * 60 * 60 * 1000
      );

      giftCards.push({ code, value, expiresAt });
    }

    const saved = await GiftCard.insertMany(giftCards);
    res.status(201).json({ status: "successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate gift cards" });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await GiftCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const redeemCard = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "missing code" });
    }
    const giftCard = await GiftCard.findOne({ code: code.toUpperCase() });

    if (!giftCard) {
      return res.status(404).json({ error: "Gift card not found" });
    }
    if (giftCard.redeemed) {
      return res.status(400).json({ error: "Gift card already redeemed" });
    }
    if (giftCard.expiresAt < new Date()) {
      return res.status(400).json({ error: "Gift card expired" });
    }
    giftCard.redeemed = true;
    giftCard.redeemedAt = new Date();

    await giftCard.save();

    res.json({
      message: "Gift card redeemed successfully",
      value: giftCard.value,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateCard,
  redeemCard,
  getCards,
};
