import React, { useState } from "react";
import { apiHandler } from "./apiHandler";
import AdminNavBar from "../../../components/navBars/AdminNavBar";
import "./style.css";
function QuestionForm() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "",
      question: "",
      audio: "",
      responses: [
        { id: 1, response: "", iscorrect: 0 },
        { id: 2, response: "", iscorrect: 0 },
        { id: 3, response: "", iscorrect: 0 },
      ],
    },
  ]);
  const api = new apiHandler();
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        title: "",
        question: "",
        audio: "",
        responses: [
          { id: 1, response: "", iscorrect: 0 },
          { id: 2, response: "", iscorrect: 0 },
          { id: 3, response: "", iscorrect: 0 },
        ],
      },
    ]);
  };

  const handleInputChange = (event, questionIndex, responseIndex) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    if (name === "title") {
      newQuestions[questionIndex].title = value;
    } else if (name === "question") {
      newQuestions[questionIndex].question = value;
    } else if (name === "audio") {
      newQuestions[questionIndex].audio = event.target.files[0];
    } else if (name === "response") {
      newQuestions[questionIndex].responses[responseIndex].response = value;
    }
    setQuestions(newQuestions);
  };

  const handleRadioChange = (event, questionIndex, responseIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].responses = newQuestions[
      questionIndex
    ].responses.map((response, index) => ({
      ...response,
      iscorrect: index === responseIndex ? 1 : 0,
    }));
    setQuestions(newQuestions);
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    // Save questions to database
    const formData = new FormData();
    questions.forEach(async (question) => {
      formData.set("audioFile", question.audio);
      formData.set("text", question.question);
      formData.set("setting", question.title);
      formData.set("res1", JSON.stringify(question.responses[0]));
      formData.set("res2", JSON.stringify(question.responses[1]));
      formData.set("res3", JSON.stringify(question.responses[2]));
      let result = await api.createQuestion(formData);
      console.log(result);
    });
    setQuestions([
      {
        id: 1,
        title: "",
        question: "",
        audio: "",
        responses: [
          { id: 1, response: "", iscorrect: 0 },
          { id: 2, response: "", iscorrect: 0 },
          { id: 3, response: "", iscorrect: 0 },
        ],
      },
    ])
  };
  const session = localStorage.getItem("token")
  const adminAuth = localStorage.getItem("isAdmin")
  if(!session || adminAuth != 1){
    return <h1>Unauthorized</h1>
  }else {
  return (
    <>
      <AdminNavBar />
      <div className="questionForm-background background-color">
        <div className="questionForm-container ">
          <form onSubmit={handleSubmit}>
            {questions.map((question, questionIndex) => (
              <div className="questionForm-question-card">
                <div key={question.id}>
                  <label>
                    Audio:
                    <input
                      className="questionForm-question-audio"
                      type="file"
                      name="audio"
                      onChange={(event) =>
                        handleInputChange(event, questionIndex)
                      }
                      required
                    />
                  </label>
                  <label>
                    Setting:
                    <input
                      className="questionForm-question-setting"
                      type="text"
                      name="title"
                      value={question.title}
                      onChange={(event) =>
                        handleInputChange(event, questionIndex)
                      }
                      required
                    />
                  </label>
                  <label>
                    Question:
                    <input
                      className="questionForm-question"
                      type="text"
                      name="question"
                      value={question.question}
                      onChange={(event) =>
                        handleInputChange(event, questionIndex)
                      }
                      required
                    />
                  </label>

                  {question.responses.map((response, responseIndex) => (
                    <div key={response.id}>
                      <div className="questionForm-response-radio-container">
                        <label>
                          Response {response.id}:
                          <input
                            type="text"
                            name="response"
                            className="questionForm-response"
                            value={response.response}
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                questionIndex,
                                responseIndex
                              )
                            }
                            required
                          />
                        </label>
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          value={response.id}
                          className="questionForm-radio"
                          checked={response.iscorrect === 1}
                          onChange={(event) =>
                            handleRadioChange(
                              event,
                              questionIndex,
                              responseIndex
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="questionForm-buttons-containter">
              <button
                className="questionForm-add-question"
                type="button"
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
              <button className="questionForm-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )};
}

export default QuestionForm;
