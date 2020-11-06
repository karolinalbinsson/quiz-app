import React, { useState, useEffect } from 'react';

import { ResultScreen } from 'ResultScreen';
import { Question } from 'Question';
import { Loader } from 'Loader';
import { ErrorSection } from 'ErrorSection';

export const GameBoard = ({choices}) => {

const difficulty = choices[choices.findIndex(x => x.TYPE ==="Difficulty")].value;
const questionType = choices[choices.findIndex(x => x.TYPE ==="QuestionType")].value;
const category = choices[choices.findIndex(x => x.TYPE ==="Category")].value;
const amount = choices[choices.findIndex(x => x.TYPE ==="Amount")].value;

const[fetchOk, setFetchOk] = useState(false);
const[questions, setQuestions] = useState([]);
const[questionsAnwsered, setQuestionsAnswered] = useState(0);
const[points, setPoints] = useState(0);
const[currentWindow, setCurrentWindow] = useState(-1);
const [pageLoading, setPageLoading] = useState(true);
const[fallBack, setFallBack] = useState(false);

console.log(difficulty,questionType,category);

const fallBackFetch = () => {
  console.log("Using fallback");
  fetch(`https://opentdb.com/api.php?amount=10&type=${questionType}&encode=url3986`)
  .then((res) => res.json())
  .then((json) => {
    console.log(typeof json.results);
    console.log("Length of results:",json.results.length);
    json.results.length < 1 ? setFetchOk(false) : 
    setFetchOk(true); setFallBack(true);
    setQuestions(json.results);
    setPageLoading(false);
   })
}

useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${questionType}&encode=url3986`)
  .then((res) => res.json())
  .then((json) => {
    console.log(typeof json.results);
    console.log("Length of results:",json.results.length);
    json.results.length < 1 ? 
    fallBackFetch() 
    : 
    setFetchOk(true);
    setQuestions(json.results);
    setPageLoading(false);
   })
    // eslint-disable-next-line 
},[category,difficulty,questionType,amount])



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

// const renderQuestions = () =>  {
//   console.log("In render questions");
//   questions.map((question,index) => {
//     console.log(index);
//     if(index === questionsAnwsered){
//       return(
//         <Question key={index}
//         questionText={decodeURIComponent(question.question)}
//         inCorrectAnswers={question.incorrect_answers}
//         correctAnswer={question.correct_answer}
//         nextQuestionHandler={handleAnsweredQuestion} />
//       )
//     }}
//       )
//   }



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
          {fallBack && questionsAnwsered < 1 && <ErrorSection />}
          {questionsAnwsered !== questions.length && fetchOk ?
           renderQuestions 
           : 
           (!fetchOk ? 
           <div>Uh oh</div> 
           : <ResultScreen pointsTotal={points} numQuestions={questionsAnwsered} />)}
         
      </div>}
      </div>
     )
     
  

}