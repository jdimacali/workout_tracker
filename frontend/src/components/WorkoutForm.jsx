import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!title || !load || !reps) {
      setError("All fields are required");
      return;
    }

    const workout = { title, load, reps };

    const response = await axios.post(
      "http://localhost:4000/api/workouts",
      workout,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.status === 200) {
      setError(response.error);
    }

    if (response.status === 200) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: response.data });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
