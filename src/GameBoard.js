import { Question } from 'Question';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';


export const GameBoard = ({choices}) => {

const difficulty = choices[choices.findIndex(x => x.TYPE ==="Difficulty")].value;
const questionType = choices[choices.findIndex(x => x.TYPE ==="QuestionType")].value;
const category = choices[choices.findIndex(x => x.TYPE ==="Category")].value;
const[questions, setQuestions] = useState([]);
const[questionsAnwsered, setQuestionsAnswered] = useState(0);
const[points, setPoints] = useState(0);
const[currentWindow, setCurrentWindow] = useState(0);

console.log(difficulty,questionType,category);

useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${questionType}&encode=url3986`)
  .then((res) => res.json())
  .then((json) => {
    console.log(typeof json.results);
    console.log(json.results);
    setQuestions(json.results);
   })
},[])

const handleAnsweredQuestion = (questionResult) => {
  console.log("Question is answered");
  setQuestionsAnswered(questionsAnwsered+1);
  setCurrentWindow(currentWindow+1);
  questionResult ? setPoints(points+1) : setPoints(points);
}

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

  return (
      <div>This is the game board and here are the QUESTIONS!
          {renderQuestions}
          {currentWindow}
          <div> Your points: {points} </div> 
          <div> Questions answered {questionsAnwsered} </div> 

      
      </div>)
     
  

}