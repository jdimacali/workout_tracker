const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoutes");
const colors = require("colors");

const app = express();
const PORT = process.env.PORT;

// json middleware
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// middleware that logs the path and method whenever a request comes in
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
