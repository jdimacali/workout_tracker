const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoutes");
const colors = require("colors");
const connectDB = require("./libs/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Connect to database
connectDB();

// json middleware
app.use(express.json());

// cors middleware
app.use(cors());

// middleware that logs the path and method whenever a request comes in
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
