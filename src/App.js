import React, {useState} from 'react'
import { SetupScreen } from 'SetupScreen'
import { GameBoard } from 'GameBoard';

export const App = () => {

  const[choices,setChoices] = useState([]);
  const[gameStarted, setGameStarted] = useState(false);

  const handleChanges = (choicesFromSetup) => {
    setChoices(choicesFromSetup)
  }

  const handleStart = () => {
      setGameStarted(true)
  }

  return (
   <section className="app-container">
  {!gameStarted &&  
    <SetupScreen onSubmit={handleChanges} onGameStart={handleStart}/>
  } 
  
  {gameStarted &&
    <GameBoard choices={choices}/>
  }
  </section>
  )
}
