import React, { useContext, useEffect, useState } from "react";
import "./QandA.css";
import AnswerRow from "./AnswerRow";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";
import UserContext from "../context/UserContext";

const QandA = () => {
  const [everyQuestion, setEveryQuestion] = useState([]);
  const location = useLocation();
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    if (reloadComponent) {
      // Fetch updated data or perform any necessary actions here
      setReloadComponent(false);
    }
  }, [reloadComponent]);

  // useEffect(() => {
    localStorage.setItem('ky', JSON.stringify(location.state.ky));
  // }, [handleAnsSubmit()]);
  let kyy = localStorage.getItem("ky");

  console.log(answers);
  useEffect(() => {
    const fetchQ = async () => {
      try {
        const singleQuestionRes = await axios({
          method: "post",
          url: `/users/q-a-detail`,
          data: {
            ky: kyy,
          },
        });
        setEveryQuestion(...singleQuestionRes.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
    };
    fetchQ();
    const fetchAns = async () => {
      try {
        const answerRes = await axios({
          method: "post",
          url: "/users/grab_answers",
          data: {
            ky: kyy,
          },
        });
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
    // e.preventDefault();
    try {
      // sending user data to database to register
      await axios({
        method: "post",
        url: "/users/answer",
        data: {
          ky: kyy,
          ans: form.ans,
          userId: userData.user.id,
        },
      });

<<<<<<< HEAD
      
=======
      setReloadComponent(true);

      // e.ans = "";
>>>>>>> 71fe37e44c11348eb4774ccfa212fc569209adcc
      // navigate user to home
      // navigate("/q-a-detail");
    } catch (err) {
      console.log("problem", err);
      alert(err);
    }
<<<<<<< HEAD
    // const handleReset = (e) => {
    //   // document.querySelector('textarea');
    //   setForm({
    //     [e.value]: ""
    //   });
    // };
    // handleReset()
=======
    // form.ans = "";
>>>>>>> 71fe37e44c11348eb4774ccfa212fc569209adcc
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
            <AnswerRow asker={eachAns?.user_name} ans={eachAns?.answer} />
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
