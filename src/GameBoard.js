import { Question } from 'Question';
import React, { useState, useEffect } from 'react';


export const GameBoard = ({choices}) => {

const difficulty = choices[choices.findIndex(x => x.TYPE ==="Difficulty")].value;
const questionType = choices[choices.findIndex(x => x.TYPE ==="QuestionType")].value;
const category = choices[choices.findIndex(x => x.TYPE ==="Category")].value;
const[questions, setQuestions] = useState([]);
const[questionsAnwsered, setQuestionsAnswered] = useState(0);
const[points, setPoints] = useState(0);

console.log(difficulty,questionType,category);

useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${questionType}`)
  .then((res) => res.json())
  .then((json) => {
    console.log(json.results);
    setQuestions(json.results);
   })
},[])

const handleAnsweredQuestion = (questionResult) => {
  console.log("Question is answered");
  setQuestionsAnswered(questionsAnwsered+1);
  questionResult ? setPoints(points+1) : setPoints(points);
}

  return (
      <div>This is the game board and here are the QUESTIONS!
        <div> Your points: {points} </div> 
        <div> Questions answered {questionsAnwsered} </div> 

        {questions.map((question,index) => (
          <Question key={index}
              questionText={question.question}
              inCorrectAnswers={question.incorrect_answers}
              correctAnswer={question.correct_answer}
              onFinalAnswer={handleAnsweredQuestion}
          />
        ))
          

        }
      </div>)
     
  

}