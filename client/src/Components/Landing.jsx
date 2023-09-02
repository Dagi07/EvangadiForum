import React, { useContext, useEffect, useState } from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import About from "./About.jsx";

const Landing = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending user data to database to be logged in
      const loginRes = await axios.post("http://localhost:7000/api/users/", {
        email: form.email,
        password: form.password,
      });

      // update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      // set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      // navigate user to home
      navigate("/home");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/home");
  }, [userData.user, navigate]);
  return (
    <div className="landing">
      <div className="landing-wrapper">
        <form onSubmit={handleSubmit}>
          <h4>Login to your account</h4>
          <p>
            Don't have an account?{" "}
            <span>
              <Link className="link" to="/register">
                Create a new account
              </Link>
            </span>
            <br />
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              onChange={handleChange}
            />{" "}
            <label htmlFor="email"></label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              onChange={handleChange}
            />
            <label htmlFor="password"></label>
          </p>
          <button type="submit">Submit</button>
          <p>
            <Link className="link" to="/register">
              Create a new account
            </Link>
          </p>
        </form>
        <About />
      </div>
    </div>
  );
};

export default Landing;
