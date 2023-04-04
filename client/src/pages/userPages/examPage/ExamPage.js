import React from "react";
import { apiHandler } from "./apiHandler.js";
import { useState, useEffect } from "react";
// import { Howl, Howler } from "howler";
import ReactHowler from 'react-howler'
import "./style.css";
export default function ExamPage() {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [audioEnded, setAudioEnded] = useState(0)
  const [statusCode, setStatusCode] = useState();
  const api = new apiHandler();

  useEffect(() => {
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
  }, []);

//   if (questions) {
//     const audios = questions.map((element) => {
//         return element.returnedQuestion.audioFile
//     })
//     console.log(audios);
//      var sound = new Howl({
//       src: audios,
//     volume: 0.2, 
//     }); 
//     sound.play().onend(() => {
//         console.log('soundend');
//     }
//     )
    
//   }


const handleNext = () => {
    setCurrentQuestion((value) => value + 1)
    setAudioEnded(0)
}

console.log(questions);

if (!questions) {
    return <h1>Loading</h1>
}else {
  return (
    <>
      <div className="examPage-background background-color">
        <div>ExamPage</div>
        <ReactHowler
               id={questions[currentQuestion].returnedQuestion.id}
               src={questions[currentQuestion].returnedQuestion.audioFile}
               playing={audioEnded == 0 ? true : false}
               volume={0.1}
               onEnd={()=> {setAudioEnded(1)}}
             />
        {audioEnded == 1 ? <>
        
        <div>{questions[currentQuestion].returnedQuestion.text}</div>
        <div>{questions[currentQuestion].returnedResponses[0].text}</div>
        <div>{questions[currentQuestion].returnedResponses[1].text}</div>
        <div>{questions[currentQuestion].returnedResponses[2].text}</div>

        </>
        :<h2>audio playing</h2>}
        <button onClick={handleNext}>
        next
      </button>
      </div>
    </>
  );
}
}
