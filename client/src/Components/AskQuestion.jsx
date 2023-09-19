import React, { useContext, useState } from "react";
import "./AskQuestion.css";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const [userData, setUserData] = useContext(UserContext);
  // console.log(userData.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending user data to database to register
      await axios.post("http://localhost:7000/api/users/ask", {
        userId: userData.user.id,
        title: form.title,
        qdesc: form.qdesc,
      });

      // navigate user to home
      navigate("/home");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="ask">
      <div className="steps">
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-liner title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Decribe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <form
        // action="http://localhost:7000/api/users/ask"
        // method="post"
        onSubmit={handleSubmit}
      >
        <div className="q-title">
          <h2>Ask a public question</h2>
          <p>Go to question page</p>
        </div>

        <textarea
          name="title"
          id="title"
          cols="30"
          rows="1"
          placeholder=" Title"
          onChange={handleChange}
        ></textarea>

        <textarea
          name="qdesc"
          id="qdesc"
          cols="30"
          rows="10"
          placeholder=" Question Description..."
          onChange={handleChange}
        ></textarea>

        <button>Post Your Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
