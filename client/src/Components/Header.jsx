import React, { useContext } from "react";
import logo from "../images/evangadi-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <header className="">
      <div>
        <img className="logo" src={logo} alt="evangadi-logo" />
      </div>
      <nav>
        <ul>
          <Link to="/home">
            <li>Home</li>
          </Link>
          {/* <Link to=""> */}
          <li>How it Works</li>
          {/* </Link> */}
          <Link to="/">
            <li>
              <button onClick={logout}>
                {userData.user ? "LogOut" : "SIGN IN"}
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
