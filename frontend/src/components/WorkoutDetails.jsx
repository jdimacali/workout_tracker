import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const response = await axios.delete(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="trash" onClick={handleClick}>
        <HiOutlineTrash color="red" />
      </span>
    </div>
  );
};
export default WorkoutDetails;
