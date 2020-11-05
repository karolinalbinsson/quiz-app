import React, { useState, useEffect } from 'react';

import { ResultScreen } from 'ResultScreen';
import { Question } from 'Question';
import { Loader } from 'Loader';

export const GameBoard = ({choices}) => {

const difficulty = choices[choices.findIndex(x => x.TYPE ==="Difficulty")].value;
const questionType = choices[choices.findIndex(x => x.TYPE ==="QuestionType")].value;
const category = choices[choices.findIndex(x => x.TYPE ==="Category")].value;
const[questions, setQuestions] = useState([]);
const[questionsAnwsered, setQuestionsAnswered] = useState(0);
const[points, setPoints] = useState(0);
const[currentWindow, setCurrentWindow] = useState(-1);
const [pageLoading, setPageLoading] = useState(true);

console.log(difficulty,questionType,category);

useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=${questionType}&encode=url3986`)
  .then((res) => res.json())
  .then((json) => {
    console.log(typeof json.results);
    console.log(json.results);
    setQuestions(json.results);
    setPageLoading(false);
   })
},[category,difficulty,questionType])

const handleAnsweredQuestion = (questionResult) => {
  console.log("Question is answered");
  setQuestionsAnswered(questionsAnwsered+1);
  setCurrentWindow(currentWindow+1);
  questionResult ? setPoints(points+1) : setPoints(points);
}

// eslint-disable-next-line
const renderQuestions = questions.map((question,index) => {
  console.log(index);
  if(index === questionsAnwsered){
    return(
      <Question key={index}
      questionText={decodeURIComponent(question.question)}
      inCorrectAnswers={question.incorrect_answers}
      correctAnswer={question.correct_answer}
      nextQuestionHandler={handleAnsweredQuestion} />
    )
  } 
})

/*
const startNewGame = () => {
  window.location.reload();
}
*/
  return (
    <div className="game-container">
    <div className="loader-container">{pageLoading && <Loader />}
    </div>
    
       {!pageLoading && 
        <div className="questions-wrapper">

         <div>
           
          <div>Points: {points} </div> 
          <div>Questions answered: {questionsAnwsered} out of {questions.length}  </div> 
   
          </div>
          {questionsAnwsered !== questions.length ? renderQuestions : <ResultScreen pointsTotal={points} numQuestions={questionsAnwsered} />}
          
      </div>}
      </div>
     )
     
  

}