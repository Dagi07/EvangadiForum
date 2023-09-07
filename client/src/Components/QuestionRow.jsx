import React, { useContext, useEffect, useState } from "react";
import "./QuestionRow.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const QuestionRow = ({ aQues, asker, ky }) => {
  // const [userData, setUserData] = useContext(UserContext);
  // console.log({ key });
  // let k = { key };
  // console.log(k);
  // k = k.toString();

  return (
    <div>
      <div className="question_row" key={ky}>
        <div className="profile">
          <AccountCircleIcon className="pp" />
          <p className="user-name">{asker}</p>
        </div>
        <Link to={`/q-a-detail`} state={{ ky }}>
          <div className="question">
            <p>{aQues}</p>
            <div className="rightAngle">
              <ChevronRightSharpIcon />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuestionRow;
