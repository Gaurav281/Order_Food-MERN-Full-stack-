/* eslint-disable no-undef */
const express = require("express");
const {
  checkout,
  PaymentVerification,
} = require("../controllers/paymentController.js");

// Create a router instance
const router = express.Router();

// Define a route for checkout
router.post("/checkout", async (req, res) => {
  try {
    // Call the checkout function from paymentController
    await checkout(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/paymentverification", async (req, res) => {
  try {
    // Call the checkout function from paymentController
    await PaymentVerification(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
