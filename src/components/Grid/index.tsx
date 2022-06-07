import React from 'react'
import { Guess } from '../../hooks/useMathler'
import Row from '../Row'

export interface IGridProps {
  trial: number
  currentGuess: string
  guesses: Guess[]
  size: number
}

const Grid: React.FC<IGridProps> = ({ trial, currentGuess, guesses, size }) => {
  return (
    <div>
      {guesses.map((guess, i) => {
        if (trial === i) {
          return <Row key={i} guess={guess} currentGuess={currentGuess} size={size}></Row>
        }
        return <Row key={i} guess={guess} currentGuess='' size={size}></Row>
      })}
    </div>
  )
}

export default Grid
