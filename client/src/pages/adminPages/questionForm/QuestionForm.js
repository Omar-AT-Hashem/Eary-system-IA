import React, { useState } from 'react';
import { apiHandler } from './apiHandler';

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const api = new apiHandler
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, title: '', question: '', audio: '', responses: [{ id: 1, response: '', iscorrect: 0 }, { id: 2, response: '', iscorrect: 0 }, { id: 3, response: '', iscorrect: 0 }] },
    ]);
  };

  const handleInputChange = (event, questionIndex, responseIndex) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    if (name === 'title') {
      newQuestions[questionIndex].title = value;
    } else if (name === 'question') {
      newQuestions[questionIndex].question = value;
    } else if (name === 'audio') {
      newQuestions[questionIndex].audio = event.target.files[0];
    } else if (name === 'response') {
      newQuestions[questionIndex].responses[responseIndex].response = value;
    }
    setQuestions(newQuestions);
  };

  const handleRadioChange = (event, questionIndex, responseIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].responses = newQuestions[questionIndex].responses.map((response, index) => ({
      ...response,
      iscorrect: index === responseIndex ? 1 : 0,
    }));
    setQuestions(newQuestions);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Save questions to database
    const formData = new FormData()
    questions.forEach(async (question) => { 
        formData.set('audioFile', question.audio)
        formData.set('text', question.question)
        formData.set('setting', question.title)
        formData.set('res1', JSON.stringify(question.responses[0]))
        formData.set('res2', JSON.stringify(question.responses[1]))
        formData.set('res3', JSON.stringify(question.responses[2]))
        let result = await api.createQuestion(formData)
        console.log(result);
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <label>
            Question {question.id} Title:
            <input type="text" name="title" value={question.title} onChange={(event) => handleInputChange(event, questionIndex)} />
          </label>
          <label>
            Question {question.id}:
            <input type="text" name="question" value={question.question} onChange={(event) => handleInputChange(event, questionIndex)} />
          </label>
          <label>
            Question {question.id} Audio:
            <input type="file" name="audio" onChange={(event) => handleInputChange(event, questionIndex)} />
          </label>
          {question.responses.map((response, responseIndex) => (
            <div key={response.id}>
              <label>
                Response {response.id}:
                <input type="text" name="response" value={response.response} onChange={(event) => handleInputChange(event, questionIndex, responseIndex)} />
              </label>
              <label>
                Correct:
                <input type="radio" name={`correct-${question.id}`} value={response.id} checked={response.iscorrect === 1} onChange={(event) => handleRadioChange(event, questionIndex, responseIndex)} />
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;