import React, { useContext, useEffect, useState } from 'react'
import useMathler from '../../hooks/useMathler'
import Grid from '../Grid'
import Keyboard from '../Keyboard'
import Modal from '../Modal'
import Toast from '../Toast'
import { AppContext } from '../../context/store'
import { SQUARES } from '../../constants'

import style from './index.module.css'

export interface IGameProps {
 solution: string
}

const Game: React.FC<IGameProps> = ({ solution }) => {
 const { state } = useContext(AppContext)
 const {
  currentGuess,
  handleKeyUp,
  handleKeyboardEvent,
  guesses,
  trial,
  isCorrect,
  usedKeys,
  NUM_TRIALS,
  error,
  clearGuesses,
  clearError,
 } = useMathler(solution, state.difficulty.squaresCount)

 useEffect(() => {
  clearGuesses()
 }, [state.difficulty.squaresCount])

 useEffect(() => {
  // add event listener to the window when the component loads
  window.addEventListener('keyup', handleKeyUp)

  // if the trials exceeds 6
  if (trial === NUM_TRIALS) {
   setTimeout(() => setShowModal(true), 2000)
  }

  // if the solution has been found
  if (isCorrect) {
   setTimeout(() => setShowModal(true), 2000)
  }

  if (error) {
   setTimeout(() => {
    clearError()
   }, 1000)
  }

  // cleanup
  return () => window.removeEventListener('keyup', handleKeyUp)
 }, [handleKeyUp, clearError, error, isCorrect, trial])

 const [showModal, setShowModal] = useState<boolean>(false)

 console.log(state.difficulty)

 const handleToggleModal = () => {
  setShowModal(false)
  window.location.reload()
 }

 const copyToClipboard = () => {
  let textElement = document.createElement('textarea')
  let content = `I just completed **${solution}** on Mathler Clone\n`
  content += `[${trial}/${NUM_TRIALS}]\n`
  content += document.getElementById('share')?.innerText
  content += '\n\nPlay yours at mathler-clone.netlify.app!'
  textElement.id = 'copy__text'
  textElement.value = content as string
  document.body.appendChild(textElement)
  textElement.select()
  navigator.clipboard.writeText(textElement.value)
  document.body.removeChild(textElement)
  alert('Successfully copied to clipboard.')
 }

 return (
  <div className={style.game}>
   {/* <p>Current Guess: {currentGuess}</p> */}
   <Grid
    trial={trial}
    currentGuess={currentGuess}
    guesses={guesses}
    size={state.difficulty.squaresCount}
   />
   <Keyboard usedKeys={usedKeys} handleKeyboardEvent={handleKeyboardEvent} />
   <Modal isOpen={showModal} toggleModal={handleToggleModal}>
    <h2 style={{ textAlign: 'center' }}>
     ({trial}/{NUM_TRIALS}) {isCorrect ? 'You Win 🎉' : 'You Lose 😑'}
    </h2>
    {isCorrect ? '' : <p>SOLUTION: {solution}</p>}
    <div className={style.endgame__grid} id='share'>
     {guesses.map((guess, i) => (
      <div key={i} className={style.row}>
       {guess ? guess.map((char, i) => <span key={i}>{SQUARES[char.color]}</span>) : ''}
      </div>
     ))}
    </div>
    <button className={style.copy__grid} onClick={copyToClipboard}>
     Copy to Clipboard
    </button>
   </Modal>
   {error && (
    <Toast isOpen={true} background={error.color}>
     {error.message}
    </Toast>
   )}
  </div>
 )
}

export default Game
