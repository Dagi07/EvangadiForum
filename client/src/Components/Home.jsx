import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import QuestionRow from "./QuestionRow";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  // checks user and navigation
  useEffect(() => {
    if (!userData.user) navigate("/");
  }, [userData.user, navigate]);

  const askQ = () => {
    navigate("/ask");
  };

  const [everyQuestion, setEveryQuestion] = useState([]);

  useEffect(() => {
    const fetchQ = async () => {
      try {
        const questionRes = await axios.get(
          "http://localhost:7000/api/users/ask"
        );
        setEveryQuestion(questionRes.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
    };
    fetchQ();
  }, []);
  // console.log(everyQuestion);

  return (
    <div className="home">
      <div className="container">
        <div className="top">
          <button onClick={askQ} className="ask-q-btn">
            Ask Question
          </button>
          <span className="welcome">
            <strong>Welcome: {userData.user?.display_name}</strong>
          </span>
        </div>
        <h3>Questions</h3>
        {everyQuestion.toReversed().map((eachQuestion) => (
          // {{id=eachQuestion.question_id}}
          // <Link to={"/q-a-detail/"+eachQuestion.question_id}>
          <QuestionRow
            // ky={eachQuestion.question_id}
            qid={eachQuestion.question_id}
            aQues={eachQuestion.question}
            ui={eachQuestion.user_id}
            asker={eachQuestion.user_name}
          />
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
