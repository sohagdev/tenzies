import React, { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const allNewDice = () => {
  let newDice = []
  for (let i = 0; i < 10; i++) {
    newDice.push({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    })
  }
  return newDice
}
function App() {
  const [numbers, setNumbers] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    if (
      numbers.every((die) => die.isHeld) &&
      numbers.every((die) => die.value === numbers[0].value)
    ) {
      setTenzies(true)
    }
  }, [numbers])

  const holdDice = (id) => {
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) => {
        return number.id === id ? { ...number, isHeld: !number.isHeld } : number
      })
    )
  }
  const rollDice = () => {
    // Track the number of rolls to determine if the game is won
    setRollCount((prevRollCount) => prevRollCount + 1)
    if (!tenzies) {
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) => {
          return number.isHeld
            ? number
            : { ...number, value: Math.ceil(Math.random() * 6) }
        })
      )
    } else {
      setNumbers(allNewDice())
      setTenzies(false)
      setRollCount(0)
    }
  }
  const renderAllDice = numbers.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      holdDice={holdDice}
      id={number.id}
    />
  ))
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className='die-container'>{renderAllDice}</div>
      <button className='die-rolling-button' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>

      <p className='roll-count'>You roll {rollCount} times!</p>
    </main>
  )
}

export default App
