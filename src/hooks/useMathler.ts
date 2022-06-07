import { useState } from 'react'

const NUM_TRIALS = 6

export enum Color {
 GREEN = 'green',
 YELLOW = 'yellow',
 GRAY = 'gray',
}

export interface IGuessChar {
 key: string
 color: 'yellow' | 'gray' | 'green'
}

type Error = {
 type: string
 message: string
 color: string
}

export type Guess = Array<IGuessChar>

/**
 *
 * @param solution {string} The solution
 * @param size {number} The length of the solution expression
 * @returns {}
 */
const useMathler = (solution: string, size: number) => {
 // states
 const [trial, setTrial] = useState<number>(0)
 const [currentGuess, setCurrentGuess] = useState<string>('')
 const [guesses, setGuesses] = useState<Guess[]>([...Array(NUM_TRIALS)]) // an array of formatted guesses
 const [history, setHistory] = useState<string[]>([]) // an array of guesses (string)
 const [isCorrect, setIsCorrect] = useState<boolean>(false)
 const [usedKeys, setUsedKeys] = useState<Map<string, string>>(new Map<string, string>())
 const [error, setError] = useState<Error | null>(null)

 // format a new guess into an array of letter objects
 // -> [{key:'a',color:'yellow'}]
 const formatGuess = () => {
  console.log('formatting guess - ', currentGuess)
  let solutionArray = solution.split('')
  let formattedGuess = currentGuess.split('').map((letter, i) => {
   let color = ''
   if (currentGuess[i] === solutionArray[i]) {
    color = Color.GREEN
   } else if (solutionArray.includes(currentGuess[i])) {
    color = Color.YELLOW
   } else {
    color = Color.GRAY
   }

   return { key: letter, color: color }
  })
  return formattedGuess as Guess
 }

 // add a new guess
 // update the guess history state
 // update the number of turns
 // update the isCorrect state if the guess is correct
 const addNewGuess = (formattedGuess: Guess) => {
  // if the guess is equal to the solution
  if (currentGuess === solution) {
   setIsCorrect(true)
  }

  // otherwise
  // update the guesses array state
  setGuesses((prevGuesses) => {
   let newGuesses = [...prevGuesses]
   newGuesses[trial] = formattedGuess
   return newGuesses
  })

  // update the trial count
  setTrial((prevTrial) => {
   return prevTrial + 1
  })

  // update the history
  setHistory((prevHistory) => {
   return [...prevHistory, currentGuess]
  })

  // update the used keys
  setUsedKeys((prevUsedKeys) => {
   let newUsedKeys = prevUsedKeys
   formattedGuess.forEach((guess) => {
    newUsedKeys.set(guess.key, guess.color)
   })
   return newUsedKeys
  })

  // clear the current guess
  setCurrentGuess('')
 }

 // handle key up event for typing the letters
 // if the user presses the `enter` key, submit the guess
 const handleKeyUp = ({ key }: KeyboardEvent) => {
  console.log(key)
  // if the pressed key is Enter
  if (key === 'Enter') {
   // if the currentGuess is less than size characters
   if (currentGuess.length < size) {
    console.log('Current guess is less than size characters.')
    return
   }

   // if the trials are more than 6
   if (trial > 5) {
    console.log('You have exhausted your number of trials.')
    return
   }

   // if the currentGuess exists in the history
   if (history.includes(currentGuess)) {
    setError({
     type: 'INVALID_GUESS',
     message: 'Guess already exists.',
     color: 'orange',
    })
    return
   }

   try {
    const result = evaluate(currentGuess)
    //console.log(currentGuess, result);
    if (result !== evaluate(solution)) {
     throw new EvalError()
    }
   } catch (error) {
    if (error instanceof EvalError) {
     setError({
      type: 'INVALID_GUESS',
      message: `${currentGuess} is not = ${evaluate(solution)}`,
      color: 'orange',
     })
     return
    }

    setError({
     type: 'INVALID_GUESS',
     message: 'Invalid expression',
     color: 'pink',
    })
    return
   }

   //console.log(formatGuess());
   const formattedGuess = formatGuess()
   addNewGuess(formattedGuess)
  }
  // if the pressed key is Backspace
  if (key === 'Backspace') {
   setCurrentGuess((prev) => {
    return prev.slice(0, -1)
   })
   return
  }
  // if the pressed key is a letter
  if (/^[0-9)(*/^+-]$/.test(key)) {
   // if the current guess is less than size
   if (currentGuess.length < size) {
    setCurrentGuess((prev) => {
     return prev + key
    })
   }
  }
 }

 // for evaluating the mathematical expressions
 const evaluate = (expression: string) => {
  expression = expression.replace('^', '**')
  return eval(expression)
 }

 const handleKeyboardEvent = (char: string) => {
  if (char === 'Delete') {
   char = 'Backspace'
  }
  handleKeyUp(new KeyboardEvent('keyup', { key: char }))
 }

 const clearError = () => {
  setError(null)
 }

 const clearGuesses = () => {
  setGuesses([...Array(NUM_TRIALS)])
  setHistory([])
  setTrial(0)
  setUsedKeys(new Map<string, string>())
 }

 return {
  trial,
  currentGuess,
  guesses,
  history,
  isCorrect,
  handleKeyUp,
  addNewGuess,
  formatGuess,
  usedKeys,
  NUM_TRIALS,
  error,
  clearError,
  handleKeyboardEvent,
  clearGuesses,
 }
}

export default useMathler
