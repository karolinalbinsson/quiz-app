import React, { useEffect, useState } from 'react'

export const Question = ({questionText,inCorrectAnswers,correctAnswer, onFinalAnswer}) => {

  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [allAnswers, setAllAnswers] = useState([...inCorrectAnswers,correctAnswer]);
 
  const onAnswer = (inAnswer) => {
   let isCorrect = false;
    console.log("In Question component, Question is answered", inAnswer);
    setAnswered(true);
   if(inAnswer === correctAnswer)
   {
     console.log("The answer is equal to the correct answer", correctAnswer, inAnswer);
     isCorrect = true;
   }
   else {
    console.log("The answer is NOT equal to the correct answer", correctAnswer, inAnswer);
     isCorrect=false;}
    setCorrectlyAnswered(isCorrect);
    toggleHighlight();
    onFinalAnswer(isCorrect);
    setUserAnswer(inAnswer);
  }


  const toggleHighlight = () => {
      setHighlightCorrectAnswer(true);
  }

  return (
    <div className="question-card"> 

      <h1>{questionText}</h1>

      {allAnswers.map((text,index) => (
        <button 
          key={index} 
          type="button"
          onClick={() => onAnswer(text)}
        >{text}
        </button>

      ))}
      {
        /*<button className={highlightCorrectAnswer === false ? "questionButton" : "correctAnswerButton"}
        key="correct" 
        type="button"
        onClick={() => onAnswer(true,correctAnswer)}
      >{correctAnswer}</button>
        */ 
      }

      {answered && !correctlyAnswered && <p>Your answer: {userAnswer}</p>}
      {answered && correctlyAnswered && <p>Yes, correct!</p>}
    </div>
  )
}