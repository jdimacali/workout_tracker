const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// Get a specific workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({ message: "No id was provided" }).status(400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findById(id);
    res.status(200).json(workout);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort();
    res.status(200).json(workouts);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({ message: "No id was provided" }).status(400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findByIdAndRemove({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  if (!title) {
    res.json({ message: "No title was provided" }).status(400);
  }
  if (!load) {
    res.json({ message: "No load was provided" }).status(400);
  }
  if (!reps) {
    res.json({ message: "No reps was provided" }).status(400);
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });

    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  if (!title) {
    res.json({ message: "No title was provided" }).status(400);
  }
  if (!load) {
    res.json({ message: "No load was provided" }).status(400);
  }
  if (!reps) {
    res.json({ message: "No reps was provided" }).status(400);
  }
  if (!id) {
    res.json({ message: "No id was provided" }).status(400);
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

module.exports = {
  getWorkout,
  getWorkouts,
  deleteWorkout,
  createWorkout,
  updateWorkout,
};
