import React from "react";
import { apiHandler } from "./apiHandler";
import { useState, useEffect } from "react";
import UserNavBar from "../../../components/navBars/UserNavBar";

export default function ActiveUserHome() {
  const api = new apiHandler();
  const [questions, setQuestions] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await api.getQuestions();
      setQuestions(result.data);
    }
    fetchData();
  }, []);

  const handleSelectQuestion = (e) =>{
    const questionID = e.target.id
    if(selectedQuestions.includes(questionID)){
        const updatedSelectedQuestions = selectedQuestions
        const index = selectedQuestions.indexOf(questionID)
        updatedSelectedQuestions.splice(index, 1)
        setSelectedQuestions(updatedSelectedQuestions)
    }else{
    setSelectedQuestions(values => [...values, e.target.id])
    }
  }

  console.log(selectedQuestions);

  if(!questions){
    return <h1>loading</h1>
  }else{

  return(
    <>
    <UserNavBar />
     {questions.map((question) => {
        return <p id={question.id} onClick={handleSelectQuestion}>{question.setting}</p>
     })}
    </>
   )
 }
}