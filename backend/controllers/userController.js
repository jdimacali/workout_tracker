const User = require("../models/User");
const jwt = require("jsonwebtoken");

// create a jwt token that takes an id for payload, the secret, and options: it will expire in 3days keeping them log in for that long
const createToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.SECRET,
    {
      expiresIn: "3d",
    }
  );
};

// login user
const loginUser = async (req, res) => {
  // destructure the email and password from the body
  const { email, password } = req.body;

  // check if the email and password were both provided
  if (!email || !password) {
    throw Error("All fields are required");
  }

  try {
    // Use the login static method created in userSchema
    const user = await User.login(email, password);

    // create a token for the logined user
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: "There was an error logging in" });
  }
};

// signup user
const singupUser = async (req, res) => {
  // grab the email and password from request body
  const { email, password } = req.body;

  try {
    // Use the signup static method created in userSchema
    const user = await User.signup(email, password);

    // create token using jwt
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, singupUser };
