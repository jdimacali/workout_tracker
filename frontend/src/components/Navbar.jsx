import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <div className="logo-container">
            <GiWeightLiftingUp className="logo" /> <h1> WORKOUT BUDDY </h1>
          </div>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
