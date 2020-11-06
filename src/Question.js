import React, { useState } from 'react'

export const Question = ({questionText,inCorrectAnswers,correctAnswer,nextQuestionHandler}) => {

  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [allAnswers] = useState(shuffleArray([...inCorrectAnswers,correctAnswer]));
  const rightAnswer = decodeURIComponent(correctAnswer);

  const onAnswer = (inAnswer) => {
    let isCorrect = false;
      setAnswered(true);
    if(inAnswer === rightAnswer)
    {
      isCorrect = true;
    }
    else {
      isCorrect=false;
      }
    setCorrectlyAnswered(isCorrect);
    setUserAnswer(inAnswer);
    //console.log("User answer:",userAnswer);
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
   
      <h1 className={!answered ? "question-unanswered" : "question-answered"}>{questionText}</h1>
  {/*!{answered && */ }
      <div className="question">
      {allAnswers.map((text,index) => (
        <button
          tabIndex="0"
          id={index} 
          value={decodeURIComponent(text)}
          key={index} 
          type="button"
          onClick={() => (onAnswer(decodeURIComponent(text)))}
          className={
            ((decodeURIComponent(text) === rightAnswer) && (decodeURIComponent(text) === userAnswer)) ? 
            (answered ? "button-correct" : "answer-button") 
            : ((decodeURIComponent(text) === rightAnswer) && (decodeURIComponent(text) !== userAnswer) && answered) ? "should-have-clicked-this-button" 
            :(answered && (decodeURIComponent(text) === userAnswer) ? "button-wrong" : "answer-button")}
           disabled={answered}
        >{decodeURIComponent(text)}
        </button>
      ))
     }</div>

  {answered && 
     <div className="results">
       {/*correctlyAnswered && <div>Congrats, {userAnswer} is correct!</div>*/}
       {/*!correctlyAnswered && 
       <div>
         Sorry, {userAnswer} is wrong. The correct answer is {rightAnswer} 
       </div>*/}
      <button className="next-question" type="button" onClick={goToNextQuestion}>
        Next question
      </button>
      </div>
  }
  </div>
    
  )
}