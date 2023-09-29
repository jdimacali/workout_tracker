const jwt = require("jsonwebtoken");
const User = require("../models/User");

// verify authentication
const requireAuth = async (req, res, next) => {
  console.log(req.headers);
  // grab the authorization header from the headers
  const { authorization } = req.headers;

  //   check if it has a value
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //   get the token from the header
  const token = authorization.split(" ")[1];

  try {
    // get the id and verify the token is valid using the jwt method verify and providing the secret
    const { _id } = jwt.verify(token, process.env.SECRET);
    // put the user in the req body and get the id only from the database
    req.user = await User.findById(_id).select("_id");
    // go to the next middleware or function
    next();
  } catch (error) {
    console.log(error);
    // if the token is not verified then return a status of 401
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = requireAuth;
