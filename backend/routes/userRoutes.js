const express = require("express");
const { loginUser, singupUser } = require("../controllers/userController");
const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signUp", singupUser);

module.exports = router;
