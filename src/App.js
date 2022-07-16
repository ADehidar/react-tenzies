import React, { useEffect } from "react"; 
import Die from './Die'
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App(){

  const [dice , setDice] = React.useState(generateDice());
  const [tenzies,setTenzies] = React.useState(false);

  useEffect(
    () => {
      const isAllHeld = dice.every(d => d.isHeld) 
      const firstValue = dice[0].value
      const isAllSameDigits = dice.every(d => d.value == firstValue)

      if(isAllHeld && isAllSameDigits){
        setTenzies(true)
        
      } 
    }, [dice]
  )

  function generateDice(){

    const allNewDice = [];

    for(let i =0 ; i < 10 ;i ++){
      allNewDice.push(generateNewDice());
    }
    return allNewDice;
  }

  function generateNewDice(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld : false,
      id: nanoid()
    }
  }

  function onHold(id){
    
      setDice(oldDice => 
        oldDice.map(
         dice =>  {
          return dice.id == id ?  
           { ...dice,isHeld : !dice.isHeld}
           : dice
          }
        ));
     
  }

  const diceElements = dice.map(d => 
  <Die  
      isHeld ={d.isHeld}
      key ={d.id} 
      value ={d.value}
      onHold ={() => onHold(d.id)}
  />
      );

  function rollDice(){
    if(!tenzies){
        setDice(
          dicoldDice => dicoldDice.map(
            die => {
              return die.isHeld ?
                die :
                generateNewDice();
            }
          )
        );
      }
      else {
        setTenzies(false)
        setDice(generateDice())
      }
  }

  return (
     <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
       {diceElements}
      </div>
      <button onClick={rollDice} className='roll-dice'>{tenzies ? "NEW GAME" : "ROLL"}</button>
     </main>
  );
}