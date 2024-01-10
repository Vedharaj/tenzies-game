import React, {useState, useEffect} from 'react';
import './App.css';
import Die from './components/die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = useState(Array(10).fill().map(()=>generateNewDie()))
  const [tenzies, setTenzies] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem('hs') || 0)

  useEffect(()=>{
    const allHeld = dice.every(die=>die.isHeld)
    const sameValue = dice.every(die=>die.value === dice[0].value)
    if (allHeld && sameValue){
      setTenzies(true)
    }
  }, [dice, highScore, score])

  function generateNewDie(){
    return {
      value: Math.floor(Math.random()*6)+1,
      isHeld: false,
      id: nanoid()
    }
  }
  
  const handleRollDice= ()=>{
    if (!tenzies){
      setScore(s=>s+1)
      setDice(oldDice=>oldDice.map(die=>
        {
          return die.isHeld ? die : generateNewDie()
        }))
    } else{
      if (score < highScore || highScore === 0){
        setHighScore(score)
        localStorage.setItem('hs', score)
      }
      setScore(0)
      setTenzies(false)
      setDice(Array(10).fill().map(()=>generateNewDie()))
    }
  }

  function holdDie(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id === id ? 
      {...die, isHeld: !die.isHeld}
      : die
    }))
  }

  const DiceContainer = ()=>{
      return dice.map((e)=>(
        <Die id={e.id} value={e.value} isHeld={e.isHeld} key={e.id} holdDie={()=>holdDie(e.id)}/>
      ))
  }

  return (
    <div className="App">
      {tenzies && <Confetti className='full-w-h'/>}
      <div className='d-flex position-relative align-self-start w-100 justify-content-around'>
        <p className='me-5 h5 text-success'><b>Score:</b> {score}</p>
        <p className='h5 text-success'><b>High Score:</b> {highScore}</p>
      </div>
      <h1 className='value-primary fw-bold'>Tenzies Game</h1>
      <p className='value-break h6 text-center w-75 fw-normal value-center mt-2'>
        Roll until all dice are the same. Click each die to freeze it
        as its current value. between rolls.
      </p>
      <div className='dice'>
        <DiceContainer />
      </div>
      <button className="btn btn-lg btn-success mt-4" onClick={handleRollDice}>
        {tenzies ? 'new game' :'Roll Dice'}
      </button>
    </div>
  );
}

export default App;
