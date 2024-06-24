/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "youAreMySecureUser";
router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body(
      "userType",
      "userType can only be : user , Restaurant , dilevery boy"
    ).isLength({ min: 4 }),
    body("fname").isLength({ min: 3 }),
    body("lname").isLength({ min: 0 }),
    body("password", "weak password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const sPassword = await bcrypt.hash(req.body.password, salt);
    if (["user", "restaurant", "delivery boy"].includes(req.body.userType)) {
      // Your code here
      try {
        await user.create({
          userType: req.body.userType,
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          location: req.body.location,
          password: sPassword,
        });
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  }
);

router.post(
  "/loginuser",
  [body("email", "Invalid Email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid Details" });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (req.body.userType !== userData.userType) {
        return res.status(400).json({ errors: "Wrong userType" });
      }
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Wrong password" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      // { success: true, authToken: authToken }
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
