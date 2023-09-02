import React, { useContext, useEffect, useState } from "react";
import "./QandA.css";
import AnswerRow from "./AnswerRow";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const QandA = () => {
  const [everyQuestion, setEveryQuestion] = useState([]);
  const location = useLocation();
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  console.log(answers);
  useEffect(() => {
    const fetchQ = async () => {
      try {
        const singleQuestionRes = await axios.post(
          `http://localhost:7000/api/users/q-a-detail`,
          {
            ky: location.state.ky,
          }
        );
        setEveryQuestion(...singleQuestionRes.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
    };
    fetchQ();
    const fetchAns = async () => {
      try {
        const answerRes = await axios.post(
          "http://localhost:7000/api/users/grab_answers",
          {
            ky: location.state.ky,
          }
        );
        setAnswers(answerRes.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
    };
    fetchAns();
  }, []);

  const handleAnsChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAnsSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending user data to database to register
      await axios.post("http://localhost:7000/api/users/answer", {
        ky: location.state.ky,
        ans: form.ans,
        userId: userData.user.id,
      });

      e.ans = "";
      // navigate user to home
      // navigate("/q-a-detail");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
    form.ans = "";
  };
  // console.log(everyQuestion);
  return (
    <div className="qanda">
      <div className="qanda-wrapper">
        <div className="q">
          <h3>Question</h3>
          <h4>{everyQuestion.question}</h4>
          <p>{everyQuestion.question_description}</p>
        </div>
        <h2>Answer From The Community</h2>
        <div className="ans">
          {answers.map((eachAns) => (
            <AnswerRow asker={eachAns.user_name} ans={eachAns.answer} />
          ))}
          <form className="ansForm" onSubmit={handleAnsSubmit}>
            <div className="q-title">
              <h2>Answer The Top Question</h2>
              <p>Go to question page</p>
            </div>
            <div>
              <textarea
                name="ans"
                id=""
                cols="10"
                rows="10"
                placeholder=" Your Answer"
                onChange={handleAnsChange}
              ></textarea>
            </div>

            <button>Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QandA;
