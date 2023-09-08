import React, { useContext, useState } from "react";
import "./Forgetpass.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";
import About from "./About";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserContext from "../context/UserContext";

const NewPass = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  // const [conshowPassword, setconShowPassword] = useState(false);
  //     const togglePasswordVisibility = () => {
  //       setShowPassword(!showPassword);
  //   };
  //   const contogglePasswordVisibility = () => {
  //       setconShowPassword(!conshowPassword);
  //   };

  const [showPassword, setShowPassword] = useState(false);
  const [conshowPassword, setconShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const contogglePasswordVisibility = () => {
    setconShowPassword(!conshowPassword);
  };

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
  const validateForm = () => {
    if (form.password == form.c_password) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (1) {
      //  if (validateForm()) {
      try {
        axios.defaults.withCredentials = true;
        form.email = userData.email;
        console.log(form);
        const response = await axios.post(`/users/changePassword`, form);
        const data = response.data;
        // alert(data.msg)
        if (data.msg == "Password changed successfully") {
          setUserData({
            type: "SET_USER",
            userData: null,
          });
          navigate("/success");
        }

        console.log(data);
      } catch (error) {
        // alert("Error authenticating user");
        setMessage(error.response.data.msg);
        console.log("Error authenticating user:", error.message);
        setMessage("password don't match");
        setError({
          ...errors,
          pass: "Network Error: Unable to reach the server",
        });
      }
    }
    //  else {
    //     setMessage("password don't match")
    //   }
  };

  return (
    <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Enter new password</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/signup" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className={`in11 ${message && "error"}`}
              type={showPassword ? "text" : "password"}
              name="new_password"
              onChange={(e) => setField("new_password", e.target.value)}
              placeholder="New Password"
            />
            <span className="showHide2" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaEyeSlash
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
              )}
            </span>
            <br />
            <input
              className={`in11 ${message && "error"}`}
              type={conshowPassword ? "text" : "password"}
              name="c_password"
              onChange={(e) => setField("c_password", e.target.value)}
              placeholder="Confirm Password"
            />
            <span className="showHide2" onClick={contogglePasswordVisibility}>
              {conshowPassword ? (
                <FaEyeSlash
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
              )}
            </span>
            <br />
            <small className="error__msg">{message}</small>
            <br />
            <button className="btn1">submit</button>
          </form>
          <Link to="/login" className="a3 a1">
            Signin with email and password
          </Link>
        </div>
        <About />
      </div>
    </div>
  );
};

export default NewPass;
