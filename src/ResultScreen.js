import React from 'react'

export const ResultScreen = ({pointsTotal, numQuestions}) => {


  const restartGame = () => {
    window.location.reload()
  }

  return  (
    <div className="result-screen">
      {pointsTotal === numQuestions && <h1>Congrats! All questions answered correctly.</h1>}
      {pointsTotal >= (numQuestions/2) && <h1>Good job!</h1>}
      {pointsTotal < 2 && <h1>Hmm.. looks like you need some more practice!</h1>}
    <h2>You got {pointsTotal} points of {numQuestions} possible
      </h2> 
      <button className="new-game-button" type="button" onClick={restartGame}>New game</button>
      </div>
  )
}