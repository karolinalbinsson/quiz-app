import React, {useState} from 'react';

export const Welcome = ({onContinue}) => {


  const[playerMode, setPlayerMode] = useState('');
  const[numPlayers, setNumPlayers] = useState(1);
  const[validated, setValidated] = useState(false);
  const[isValid, setIsValid] = useState(false);
  const[playerList, setPlayerList] = useState([]);

  let newPlayers = [];

  const validateChoices = () => {
    setValidated(true);
    if(playerMode !== ''){
       if(playerMode === 'single'){
         setNumPlayers(1);
         setIsValid(true);
         newPlayers = ['Player 1']
         setPlayerList(newPlayers);
  
       }
       else if(playerMode ==='multi'){
         if(numPlayers !== '' && numPlayers > 1){
           setIsValid(true);
           let i;
           for(i=0;i<numPlayers;i++){
              newPlayers = [...newPlayers, `Player ${i+1}`];
           }
           setPlayerList(newPlayers);
         }
       }
    }
    else setIsValid(false);
  }

  const goOn = (inList) => {
    console.log(inList)
  }

  return (
    <section className="welcome-screen">
      <h1>Quiztime</h1>
      <div className="player-mode">
        <button type="button" onClick={() =>setPlayerMode('single')}>Single player</button>
        <button type="button" onClick={() =>setPlayerMode('multi')}>Multi player</button>
        {playerMode === 'multi' && 
        <div className="multi-mode-numbers">
          <button type="button" onClick={() =>setNumPlayers(2)}>2</button>
          <button type="button" onClick={() =>setNumPlayers(3)}>3</button>
          <button type="button" onClick={() =>setNumPlayers(4)}>4</button>
        </div>
      }

      {validated && !isValid && 
      <div>Hmm.. make sure you've made the correct choices.</div>}
      {playerMode !== '' && numPlayers > 0 &&
      <button type="button" onClick={validateChoices}>Continue</button>
      }

      
      </div>
    </section>
  )
}
