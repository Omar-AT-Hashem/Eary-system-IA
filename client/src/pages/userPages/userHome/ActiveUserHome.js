import React from "react";
import { apiHandler } from "./apiHandler";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../../components/navBars/UserNavBar";
import "./style.css";
import { json } from "react-router-dom";
export default function ActiveUserHome() {
  const api = new apiHandler();
  const [questions, setQuestions] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const result = await api.getQuestions();
      setQuestions(result.data);
    }
    fetchData();
  }, []);

  const handleSelectQuestion = (e, parent) => {
    const questionID = e.currentTarget.id;
    const className = e.currentTarget.className;
    //uselects the question if selected
    if (selectedQuestions.includes(questionID)) {
      const updatedSelectedQuestions = selectedQuestions;
      const index = selectedQuestions.indexOf(questionID);
      updatedSelectedQuestions.splice(index, 1);
      //sets classname to adjust css
      if (className == "userHome-question-card userHome-selected") {
        e.currentTarget.className = "userHome-question-card";
      }
      setSelectedQuestions(updatedSelectedQuestions);
    } else {
      //sets classname to adjust css
      if (className == "userHome-question-card") {
        e.currentTarget.className = "userHome-question-card userHome-selected";
      }
      //selects the question if not selected
      setSelectedQuestions((values) => [...values, e.target.id]);
    }
  };

  const handleStartExam = () => {
    localStorage.setItem(
      "selectedQuestions",
      JSON.stringify(selectedQuestions)
    );
    navigate(`/${localStorage.username}/exam`);
  };

  console.log(selectedQuestions);

  if (!questions) {
    return <h1>loading..</h1>;
  } else {
    return (
      <>
        <UserNavBar />
        <div className="userHome-background background-color">
          <div className="userHome-questions-container">
            {questions.map((question) => {
              return (
                <div
                  className="userHome-question-card"
                  id={question.id}
                  onClick={handleSelectQuestion}
                >
                  <div id={question.id} className="userHome-question-setting">
                    {question.setting}
                  </div>
                  <span id={question.id}>.</span>
                </div>
              );
            })}
            <button
              className="userHome-start-exam-button"
              onClick={handleStartExam}
            >
              {" "}
              Start Exam
            </button>
          </div>
        </div>
      </>
    );
  }
}
