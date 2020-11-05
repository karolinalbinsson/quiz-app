import React from 'react'

export const ResultScreen = ({pointsTotal, numQuestions}) => {


  const restartGame = () => {
    window.location.reload()
  }

  return  (
    <div><h1>Congrats!</h1>
    <h2>You got {pointsTotal} points of {numQuestions} possible
      </h2> 
      <button type="button" onClick={restartGame}>New game</button>
      </div>
  )
}