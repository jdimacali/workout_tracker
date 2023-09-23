const Workout = require("../models/Workout");

const getWorkout = async (req, res) => {
  res.json({ message: "Get a workout" });
};

const getWorkouts = async (req, res) => {
  res.json({ message: "Get workouts" });
};

const deleteWorkout = async (req, res) => {
  res.json({ message: "delete a workout" });
};

const addWorkout = async (req, res) => {
  res.json({ message: "add a workout" });
};

const updateWorkout = async (req, res) => {
  res.json({ message: "update a workout" });
};

module.exports = {
  getWorkout,
  getWorkouts,
  deleteWorkout,
  addWorkout,
  updateWorkout,
};
