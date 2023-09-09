import React, { useContext, useState } from "react";
import "./Forgetpass.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";
import About from "./About";
import UserContext from "../context/UserContext";

const Forgetpass = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setError({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (1) {
      // if (validateForm()) {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios({
          method: "post",
          url: "/users/forgetpassword",
          data: form,
        });
        // await axios.post(`/users/forgetpassword`, form);
        const data = response.data;
        // alert(data.msg)
        if (data.state == "success") {
          setUserData({
            type: "SET_EMAIL",

            user: form.email,
          });

          navigate("/code");
        }
        console.log(data);
      } catch (error) {
        // alert("Error authenticating user");
        setMessage("Error authenticating user");
        console.log("Error authenticating user:", error.message);
        setError({
          ...errors,
          pass: "Network Error: Unable to reach the server",
        });
      }
    }
  };
  console.log(userData);
  return (
    <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Forget Password</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/register" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1"
              type="email"
              name="email"
              onChange={(e) => setField("email", e.target.value)}
              placeholder="Your Email"
            />
            <br />
            <small className="error__msg">{message}</small>
            <br />
            <br />
            <span className="showHide2">
              <br />
            </span>
            <button className="btn1">submit</button>
          </form>
          <Link to="/" className="a3 a1">
            Signin with email and password
          </Link>
        </div>
        <About />
      </div>
    </div>
  );
};

export default Forgetpass;
