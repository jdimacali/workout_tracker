import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { HiOutlineTrash } from "react-icons/hi";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async (e) => {
    const response = await axios.delete(
      `http://localhost:4000/api/workouts/${workout._id}`
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
        <HiOutlineTrash color="red"/>
      </span>
    </div>
  );
};
export default WorkoutDetails;
