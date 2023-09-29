const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check if the email is valid
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }

  // check if the password is valid
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }
  // check if email already exists
  const existingEmail = await this.findOne({ email });

  // if the email already exists then throw an error
  if (existingEmail) {
    throw Error("Email already in use");
  }

  // if the email does not exist then hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create new user with email and hashed password
  const user = this.create({ email: email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  // check if the email and password were both provided
  if (!email || !password) {
    throw Error("All fields are required");
  }

  // check if the user exits
  const user = await this.findOne({ email });

  // if user does
  if (!user) {
    throw Error("No user found");
  }

  // check if the the provided password and the password found on the user matches using bcrypt
  const match = await bcrypt.compare(password, user.password);

  // if it doesn't match then throw an error
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
