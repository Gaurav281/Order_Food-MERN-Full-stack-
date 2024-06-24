/* eslint-disable no-undef */
const Razorpay = require("razorpay");
const { config } = require("dotenv");
const crypto = require("crypto");
const paymentSchema = require("../models/PaymentSchema");

// Load environment variables from config file
config({ path: "./config/config.env" });

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Define the checkout function
const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided",
      });
    }

    const options = {
      amount: Number(amount * 100), // Convert to paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order) {
      throw new Error("Order creation failed");
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create order",
      error: error.message,
    });
  }
};

const PaymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await paymentSchema.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      // Redirect to payment success page
      res.redirect(
        `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

module.exports = { checkout, PaymentVerification };
