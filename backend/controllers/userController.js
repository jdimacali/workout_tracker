const mongoose = require("mongoose");
const User = require("../models/User");

// login user
const loginUser = async (req, res) => {
  const user = User.find({});
  res.json({ message: "login User" });
};

// signup user
const singupUser = async (req, res) => {
  const { email, password } = req.body;
  const user = User.create({ email, user });
  res.json({ message: "signup User" });
};

module.exports = { loginUser, singupUser };
