import React from "react";
import { apiHandler } from "./apiHandler.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactHowler from "react-howler";
import speakerImage from "../../../assets/images/speaker-icon.png"
import "./style.css";
export default function ExamPage() {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [audioEnded, setAudioEnded] = useState(0);
  const [isCorrectValue, setIsCorrectValue] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [submit, setSubmit] = useState(0);
  const [statusCode, setStatusCode] = useState();

  const api = new apiHandler();
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.examID){
    let questionIDs = JSON.parse(localStorage.selectedQuestions);
    async function fetchData() {
      const result = await Promise.all(
        questionIDs.map(async (questionID) => {
          const response = await api.getQuestion(questionID);
          return response.data;
        })
      );
      setQuestions(result);
    }
    fetchData();
  }
    else {
      async function fetchData() {
        let questionIDs = await api.getExamQuestions(localStorage.examID)
        questionIDs = questionIDs.data.map((question) => {
          return question.questionID
        })
        const result = await Promise.all(
          questionIDs.map(async (questionID) => {
            const response = await api.getQuestion(questionID);
            return response.data;
          })
          
        );
        setQuestions(result);
      }
      fetchData();
    }
        
  }, []);

  const handleNext = () => {
    setCurrentQuestion((value) => value + 1);
    setAudioEnded(0);
    if (isCorrectValue == 1) 
    {
      setCorrectCounter((value) => value + 1);
    }
    setIsCorrectValue(0);
  };

  console.log(correctCounter);

  const handleSubmit = async () => {
    setAudioEnded(0);
    let correct = correctCounter
    if (isCorrectValue == 1) 
    {
      setCorrectCounter((value) => value + 1);
      correct = correctCounter + 1
    }
    setIsCorrectValue(0);
    const grade = `${correct}/${questions.length}`
    const data = {questionIDs: localStorage.selectedQuestions, grade:grade }
    const result = await api.createExam(data)
    console.log(result);
    setSubmit(1)
   
    setTimeout(()=>{
      navigate(`/${localStorage.username}`)
      localStorage.removeItem("selectedQuestions")
      localStorage.removeItem("examID")
    }, 4000)
  };

  const handleRadioChange = (e) => {
    e.target.value == 1 ? setIsCorrectValue(1) : setIsCorrectValue(0);
  };

  console.log(questions);

  const session = localStorage.getItem("token")
    if(!session){
      return <h1>Unauthorized</h1>
    }
else if (!questions) {
    return (
    <div className="examPage-background background-color">
    <h1>Loading</h1>
    </div>
    );
  } else if(submit == 1) {
    return (
    <div className="examPage-background background-color">
    <div className="examPage-score">You scored {`${correctCounter}/${questions.length}`}</div>
    </div>)
  }else{
    return (
      <>
        <div className="examPage-background background-color">
          <ReactHowler
            id={questions[currentQuestion].returnedQuestion.id}
            src={questions[currentQuestion].returnedQuestion.audioFile}
            playing={audioEnded == 0 ? true : false}
            volume={0.5}
            onEnd={() => {
              setAudioEnded(1);
            }}
          />
          {audioEnded == 1 ? (
            <>
              <div className="examPage-question-header">{`Question ${currentQuestion + 1}/${questions.length}`}</div>
              <div className="examPage-question-card">
                <div className="examPage-question">{questions[currentQuestion].returnedQuestion.text}</div>
                {questions[currentQuestion].returnedResponses.map(
                  (response) => {
                    return (
                      <>
                        <div className="examPage-response-and-radio-container">
                        <input
                            className="questionEditing-radio"
                            type="radio"
                            name={`isCorrect`}
                            value={response.isCorrect}
                            onChange={handleRadioChange}
                          />
                          <div className="examPage-response-text">{response.text}</div>
                         
                        </div>
                      </>
                    );
                  }
                )}

                {currentQuestion != questions.length - 1 ? (
                  <button className="examPage-button" onClick={handleNext}>Next</button>
                ) : (
                  <button className="examPage-button" onClick={handleSubmit}>Submit</button>
                )}
              </div>
            </>
          ) : (
            
            <img className="examPage-speaker-image" src={speakerImage} alt="Audio-playing"/>
          )}
        </div>
      </>
    );
  }
}
