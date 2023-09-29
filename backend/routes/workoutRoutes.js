const express = require("express");
const {
  getWorkout,
  getWorkouts,
  deleteWorkout,
  createWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Protect all routes after this middleware
router.use(requireAuth);

// Get all workouts
router.get("/", getWorkouts);

// Get a workout by id
router.get("/:id", getWorkout);

// Add a workout
router.post("/", createWorkout);

// Delete a workout by id
router.delete("/:id", deleteWorkout);

// Update a workout by id
router.patch("/:id", updateWorkout);

module.exports = router;
