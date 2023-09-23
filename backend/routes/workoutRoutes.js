const express = require("express");
const {
  getWorkout,
  getWorkouts,
  deleteWorkout,
  addWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");

const router = express.Router();

// Get all workouts
router.get("/", getWorkouts);

// Get a workout by id
router.get("/:id", getWorkout);

// Add a workout
router.post("/", addWorkout);

// Delete a workout by id
router.delete("/:id", deleteWorkout);

// Update a workout by id
router.patch("/:id", updateWorkout);

module.exports = router;
