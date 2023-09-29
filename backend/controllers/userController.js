const User = require("../models/User");

// login user
const loginUser = async (req, res) => {
  const user = User.find({});
  res.json({ message: "login User" });
};

// signup user
const singupUser = async (req, res) => {
  // grab the email and password from request body
  const { email, password } = req.body;

  try {
    // Use the signup static method created in userSchema
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, singupUser };
