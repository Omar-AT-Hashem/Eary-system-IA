import React, { useState } from 'react';

const questions = [
  {
    questionText: 'What is 1+1?',
    answerOptions: [
      { answerText: '4', isCorrect: 0 },
      { answerText: '2', isCorrect: 1 },
    ],
  },
  {
    questionText: 'How many pyramids are in giza?',
    answerOptions: [
      { answerText: '387', isCorrect: 0 },
      { answerText: '3', isCorrect: 1 },
    ],
  },
  {
    questionText: 'What my name',
    answerOptions: [
      { answerText: 'Hana', isCorrect: 1 },
      { answerText: 'tom', isCorrect: 0 },
    ],
  },
];

export const ProductInfoPage = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (answerIndex, questionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex]=answerIndex
    setUserAnswers(updatedAnswers);
  
    // Reset answer text color
    const answerOptionsElements = document.querySelectorAll(
      `.question-container:nth-child(${questionIndex + 1}) .answer-option`
    );
    answerOptionsElements.forEach((element) => {
      element.style.color = '#000';
    });
  };
  
  
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      const answerIndex = userAnswers[index];
      if (answerIndex !== undefined) {
        const isCorrect = question.answerOptions[answerIndex].isCorrect;
        const answerOptionElement = document.querySelector(
          `.question-container:nth-child(${index + 1}) .answer-option:nth-child(${
            answerIndex + 1
          })`
        );
        if (isCorrect) {
         
          newScore += 1;
        } 
      }
    });
    setScore(newScore);
    setShowScore(1);
  };
  
  

  return (
    <div className='app'>
      <h1> Quiz</h1>
      {questions.map((question, questionIndex) => (
  <div className='question-container' key={questionIndex}>
    <div className='question'>{question.questionText}</div>
    {question.answerOptions.map((answerOption, answerIndex) => (
      <label
        className={`answer-option ${
          userAnswers[questionIndex] === answerIndex ? 'selected' : ''
        } ${
          showScore && answerOption.isCorrect ? 'correct' : ''
        } ${
          showScore &&
          answerOption.isCorrect === 0 &&
          userAnswers[questionIndex] === answerIndex
            ? 'wrong'
            : ''
        }`}
        key={answerIndex}
      >
        <input
          type="radio"
          name={`question-${questionIndex}`}
          value={answerIndex}
          checked={userAnswers[questionIndex] === answerIndex}
          onChange={() => handleAnswerOptionClick(answerIndex, questionIndex)}
        />
        {answerOption.answerText}
      </label>
    ))}
  </div>
))}


<button className='submit-button' onClick={handleSubmit}>
  Submit
</button>
      {showScore && (
        <div className='score-container'>
          You scored {score} out of {questions.length} questions correctly!
        </div>
      )}
    </div>
  );
};

  
  















