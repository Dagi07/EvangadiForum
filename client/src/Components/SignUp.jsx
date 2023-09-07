import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "../axios";
import About from "./About.jsx";

const SignUp = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending user data to database to register
      await axios({
        method: "post",
        url: "/users/register",
        data: form,
      });

      const loginRes = await axios({
        method: "post",
        url: "/users/",
        data: {
          email: form.email,
          password: form.password,
        },
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
  return (
    <div>
      <div className="register">
        <div className="register-wrapper">
          <form
            className="form"
            // action="http://localhost:7000/api/users/"
            // method="post"
            onSubmit={handleSubmit}
          >
            <h4>Join the Network</h4>
            <p>
              Already have an account?{" "}
              <span>
                <Link className="link" to="/">
                  Sign in
                </Link>
              </span>
            </p>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" Email"
              onChange={handleChange}
            />{" "}
            <label htmlFor="email"></label>
            <br />
            <div className="fullName">
              <div>
                <input
                  type="text"
                  name="firstName"
                  id="fname"
                  placeholder=" First Name"
                  onChange={handleChange}
                />
                <label htmlFor="fname"></label>
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lname"
                  placeholder=" Last Name"
                  onChange={handleChange}
                />
                <label htmlFor="lname"></label>
              </div>
            </div>
            <br />
            <input
              type="text"
              name="userName"
              id="username"
              placeholder=" User Name"
              onChange={handleChange}
            />
            <label htmlFor="username"></label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" Your Password"
              onChange={handleChange}
            />
            <label htmlFor="password"></label>
            <button type="submit" className="join">
              Agree and Join
            </button>
            <p className="terms">
              {" "}
              I agree to the &nbsp;
              <Link className="link" to="#">
                Privacy Policy
              </Link>
              &nbsp; and &nbsp;
              <Link className="link" to="#">
                Terms of Service
              </Link>
              .
            </p>
            <p>
              <Link className="link" to="/">
                Already have an account?
              </Link>
            </p>
          </form>
          <About />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
