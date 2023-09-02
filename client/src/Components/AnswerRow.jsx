import React from "react";
import "./AnswerRow.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AnswerRow = ({ asker, ans }) => {
  return (
    <div className="ans_row">
      <div className="profile">
        <AccountCircleIcon className="pp" />
        <p className="user-name">{asker}</p>
      </div>
      <div className="eachAns">
        <p>{ans}</p>
      </div>
    </div>
  );
};

export default AnswerRow;
