import React from 'react'
import { Guess } from '../../hooks/useMathler'
import classNames from 'classnames'

import style from './index.module.css'

export interface IRowProps {
 guess: Guess
 currentGuess: string
 size: number
}

const Row: React.FC<IRowProps> = ({ guess, currentGuess, size }) => {
 if (currentGuess) {
  return (
   <div className={classNames(style.row, style.current)}>
    {currentGuess
     .padEnd(size, ' ')
     .split('')
     .map((letter, i) => (
      <div key={i} className={`${letter !== ' ' ? style.filled : ''}`}>
       {letter}
      </div>
     ))}
   </div>
  )
 }

 if (guess) {
  return (
   <div className={style.row}>
    {guess.map((obj, i) => (
     <div key={i} className={style[obj.color]} style={{ animationDelay: `${i * 0.2}s` }}>
      {obj.key}
     </div>
    ))}
   </div>
  )
 }

 return (
  <div className={style.row}>
   {[...Array(size)].map((_, i) => (
    <div key={i}></div>
   ))}
  </div>
 )
}

export default Row
