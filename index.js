/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 3000;
db();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/userOrderData"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/paymentRoutes"));

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
