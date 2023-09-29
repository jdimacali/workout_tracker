import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

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
          <div>
            <button onClick={handleLogout}>Log out</button>
          </div>
          <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
