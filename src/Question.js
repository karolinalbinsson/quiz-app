import React, { useEffect, useState } from 'react'

export const Question = ({questionText,inCorrectAnswers,correctAnswer, nextQuestionHandler}) => {

  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [allAnswers, setAllAnswers] = useState(shuffleArray([...inCorrectAnswers,correctAnswer]));


  const onAnswer = (inAnswer) => {
    setUserAnswer(inAnswer);
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
      isCorrect=false;
      }
      setCorrectlyAnswered(isCorrect);
      //nextQuestionHandler(isCorrect);
      setUserAnswer(inAnswer);
  }

  function shuffleArray(array) {
    console.log("In shuffle array");
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const goToNextQuestion = () => {
      nextQuestionHandler(correctlyAnswered);
  }
  
  return (
  <div className="question-card"> 
    {!answered && <div className="question">
      <h1>{questionText}</h1>
      {allAnswers.map((text,index) => (
        <button
          id={index} 
          value={decodeURIComponent(text)}
          key={index} 
          type="button"
          onClick={() => (onAnswer(decodeURIComponent(text)))}
        >{decodeURIComponent(text)}
        </button>
      ))
     }</div>}

  {answered && 
     <div className="results">
       {correctlyAnswered && <div>Congrats, {userAnswer} is correct!</div>}
       {!correctlyAnswered && 
       <div>
         Sorry, {userAnswer} is wrong. The correct answer is {correctAnswer} 
         </div>}
      <button type="button" onClick={goToNextQuestion}>
        Next question
      </button>
      </div>
  }
  </div>
    
  )
}