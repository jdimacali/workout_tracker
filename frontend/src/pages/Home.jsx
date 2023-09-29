import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}workouts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    };

    try {
      if (user) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
