import React, { useContext, useEffect, useState } from 'react'
import Game from './components/Game'
import Header from './components/Header'
import { DIFFICULTY } from './constants'
import { AppContext } from './context/store'

export interface IQuestion {
 expression: string
 result: number
}

const App: React.FC = () => {
 const [question, setQuestion] = useState<IQuestion | null>(null)
 const { state, dispatch } = useContext(AppContext)

 useEffect(() => {
  let mode = localStorage.getItem('mode')

  if (!mode) {
   mode = state.difficulty.mode
  }

  dispatch({
   type: 'SET_DIFFICULTY',
   payload: DIFFICULTY.filter((v) => v.mode === mode)[0],
  })

  fetch(`./data/${mode?.toLowerCase()}.json`)
   .then((res) => res.json())
   .then((data) => {
    // console.log(data);
    const randomQuestion = data[Math.floor(Math.random() * data.length)]
    console.log('Solution: ', randomQuestion)
    setQuestion(randomQuestion)
   })
 }, [setQuestion, state.difficulty.mode])

 return (
  <div>
   <Header />
   {question && <b>Find the hidden calculation that equals: {question.result}</b>}

   {question && <Game solution={question.expression} />}
  </div>
 )
}

export default App
