import React from 'react'

export const ErrorSection = () => {

  
  const restartGame = () => {
    window.location.reload()
  }

  return (
    <div className="error">We couldn't get the combination for you. Here are some mixed questions instead.
    <button className="new-game-button" type="button" onClick={restartGame}>No thanks, take me back to the setup page</button></div>
  ) 
}