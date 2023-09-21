import React, { useContext, useEffect, useState } from "react";
import "./QandA.css";
import AnswerRow from "./AnswerRow";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const QandA = () => {
  const [everyQuestion, setEveryQuestion] = useState([]);
  const location = useLocation();
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const {singq} = useParams()

  // // useEffect(() => {
  //   localStorage.setItem('ky', JSON.stringify(location.state.ky));
  // // }, [handleAnsSubmit()]);
  // let kyy = localStorage.getItem("ky");

  // console.log(answers);
  // useEffect(() => {
  //   const fetchQ = async () => {
  //     try {
  //       const singleQuestionRes = await axios.post(
  //         `http://localhost:7000/api/users/q-a-detail`,
  //         {
  //           // ky: location.state.ky,
  //           ky: singq,
  //         }
  //       );
  //       setEveryQuestion(...singleQuestionRes.data.data);
  //     } catch (err) {
  //       alert(err);
  //       console.log("problem", err);
  //     }
  //   };
  //   fetchQ();
  //   const fetchAns = async () => {
  //     try {
  //       const answerRes = await axios.post(
  //         "http://localhost:7000/api/users/grab_answers",
  //         {
  //           // ky: location.state.ky,
  //           ky: singq,
  //         }
  //       );
  //       setAnswers(answerRes.data.data);
  //     } catch (err) {
  //       alert(err);
  //       console.log("problem", err);
  //     }
  //   };
  //   fetchAns();
  // }, []);

  const updatedAns = {}


  useEffect(()=>{
    const getQ = async() => {
      try {
        const questions = await axios.get(`http://localhost:7000/api/users/ask`)
        
        // setEveryQuestion(questions.data.data)
        let thisQuestion = questions.data.data.filter(tq=> tq.question_id == singq)
        setEveryQuestion(thisQuestion[0])
        // console.log(thisQuestion[0])
      } catch (err) {
              alert(err);
              console.log("problem", err);
            }
    }
    getQ()

    const getA = async() => {
      try {
        const getAllAnss = await axios.get(`http://localhost:7000/api/users/getallans`)
        
        updatedAns.thisAnswer = getAllAnss.data.data.filter(ta=> ta.question_id == singq)
        setAnswers(updatedAns.thisAnswer)
        // console.log(thisAnswer)
      } catch (err) {
              alert(err);
              console.log("problem", err);
            }
    }
    getA()
  },[])

  // console.log(everyQuestion)

  const handleAnsChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleAnsSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending user data to database to register
      const fetchedAns = await axios.post("http://localhost:7000/api/users/answer", {
        // ky: location.state.ky,
        ky: singq,
        ans: form.ans,
        userId: userData.user.id,
      });
      
      setAnswers([...answers, updatedAns.thisAnswer])
      // setReloadComponent(true);

      // e.ans = "";

      // e.ans = "";
      // reload page
      // navigate("/q-a-detail/"+singq);
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
    // setAnswers([...answers])
    // const handleReset = (e) => {
    //   // document.querySelector('textarea');
    //   setForm({
    //     [e.value]: ""
    //   });
    // };
    // handleReset()

    // form.ans = "";
  };
  console.log(answers);
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
          {answers?.map((eachAns) =>
          (
            <AnswerRow asker={eachAns?.user_name} ans={eachAns?.answer} />
          )
          // console.log(eachAns)
        
          )}
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
