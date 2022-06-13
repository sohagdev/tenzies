import React from 'react'

const Die = (props) => {
  // change the style of an element based on a condition
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : '#FFF',
  }
  return (
    <div style={styles} onClick={() => props.holdDice(props.id)}>
      <h1>{props.value}</h1>
    </div>
  )
}

export default Die
