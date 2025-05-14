const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    // Convert the amount to cents (Stripe uses smallest currency unit)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
