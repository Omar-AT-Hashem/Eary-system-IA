import React, { useState, useEffect } from "react";
import { apiHandler } from "./apiHandler";
import "./style.css";
import AdminNavBar from "../../../components/navBars/AdminNavBar";

export function QuestionEditingList() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState();
  const [rerenderTrigger, setRerenderTrigger] = useState();
  const [statusCode, setStatusCode] = useState();
  const api = new apiHandler();

  useEffect(() => {
    let questionIDs = [];
    async function fetchData() {
      const returnedQuestions = await api.getQuestions();
      setQuestions(returnedQuestions.data);
      setStatusCode(returnedQuestions.status);
      questionIDs = returnedQuestions.data.map((question) => {
        return question.id;
      });
      const returnedResponses = await api.getResponses(questionIDs);
      console.log(returnedResponses);
      setResponses(returnedResponses.data);
    }

    fetchData();
  }, []);

  console.log(questions);
  console.log(responses);
  console.log(statusCode);

  const handleResponseChange = (e, index1, index2) => {
    setResponses((values) => {
      let reses = [...values];
      reses[index1][index2] = {
        ...reses[index1][index2],
        [e.target.name]: e.target.value,
      };
      return reses;
    });
  };

  const handleRadioChange = (e, index1, index2) => {
    setResponses((values) => {
      let reses = [...values];
      //sets all isCorrect values to zero
      reses[index1] = reses[index1].map((res) => {
        return { ...res, isCorrect: 0 };
      });
      //sets the selected response to be correct
      reses[index1][index2] = {
        ...reses[index1][index2],
        isCorrect: parseInt(e.target.value),
      };
      return reses;
    });
  };

  const handleQuestionChange = (e, questionIndex) => {
    let currentQuestions = [...questions];
    currentQuestions[questionIndex] = {
      ...currentQuestions[questionIndex],
      [e.target.name]: e.target.value,
    };

    setQuestions(currentQuestions);
  };

  const handleDelete = async (e, questionID) => {
    let currentQuestions = questions;
    const result = api.deleteQuestion(questionID);
    currentQuestions.splice(e.target.id, 1);
    console.log(result);
    setQuestions(currentQuestions);
    setRerenderTrigger(e.target.id);
  };

  const handleUpdate = async (e, questionID, questionIndex) => {
    let relatedResponses = responses.map((reses) => {
      return reses.filter((res) => {
        return res.questionID == questionID;
      });
    });
    relatedResponses = relatedResponses.filter((reses) => {
      return reses.length > 0;
    });
    relatedResponses = relatedResponses[0];
    console.log(relatedResponses);

    let result = await api.updateQuestion(questionID, questions[questionIndex]);
    console.log(result);
    let result2 = await api.updateResponses(relatedResponses);
    console.log(result2);
  };

  const session = localStorage.getItem("token")
  const adminAuth = localStorage.getItem("isAdmin")
  if(!session || adminAuth != 1){
    return <h1>Unauthorized</h1>
  }
  else if (statusCode == 404) {
    return (
      <div className="questionEditing-background">
        <h1 className="questionEditing-loading">No questions availabe</h1>
      </div>
    );
  } 
  else if (!questions || !responses) {
    return (
      <div className="questionEditing-background background-color">
        <h1 className="questionEditing-loading">Loading...</h1>
      </div>
    );
  } 
  else {
    return (
      <>
      <AdminNavBar />
        <div className="questionEditing-background background-color">
          <h1 className="questionEditing-header">Edit questions</h1>
          <div className="questionEditing-container">
            {questions.map((question, questionIndex) => (
              <>
                <div className="questionEditing-question-card">
                  <audio controls>
                    <source src={question.audioFile} />
                  </audio>

                  <input
                    className="questionEditing-question-setting"
                    id={question.id}
                    value={question.setting}
                    type="text"
                    name="setting"
                    onChange={(e) => {
                      handleQuestionChange(e, questionIndex);
                    }}
                  />
                  <input
                    id={question.id}
                    className="questionEditing-question"
                    value={question.text}
                    type="text"
                    name="text"
                    onChange={(e) => {
                      handleQuestionChange(e, questionIndex);
                    }}
                  />
                  {responses.map((response, index1) => {
                    return response.map((res, index2) => {
                      if (res.questionID == question.id) {
                        return (
                          <>
                            <div className="questionEditing-response-radio-container">
                              <input
                                id={res.id}
                                className="quesionEditing-response"
                                type="text"
                                name="text"
                                value={res.text}
                                onChange={(e) => {
                                  handleResponseChange(e, index1, index2);
                                }}
                              />
                              <input
                                className="questionEditing-radio"
                                type="radio"
                                name={`isCorrect-${res.id}`}
                                value={1}
                                checked={res.isCorrect === 1}
                                onChange={(e) =>
                                  handleRadioChange(e, index1, index2)
                                }
                              />
                            </div>
                          </>
                        );
                      }
                    });
                  })}
                  <div className="questionEditing-button-container">
                    <button
                      id={questionIndex}
                      className="questionEditing-delete-button"
                      onClick={(e) => {
                        handleDelete(e, question.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      id={questionIndex}
                      className="questionEditing-update-button"
                      onClick={(e) => {
                        handleUpdate(e, question.id, questionIndex);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
}
