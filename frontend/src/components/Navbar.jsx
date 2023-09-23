import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <div className="logo-container">
            <GiWeightLiftingUp className="logo" /> <h1> WORKOUT BUDDY </h1>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
