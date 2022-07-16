import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/store'
import style from './index.module.css'
import { AiOutlineAudio } from 'react-icons/ai'
import { FaRegStopCircle } from 'react-icons/fa'
import transcribeKeys from './transcribeKeys'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export interface IKeyboardProps {
 usedKeys: Map<string, string>
 handleKeyboardEvent: (char: string) => void
}

const Keyboard: React.FC<IKeyboardProps> = ({ usedKeys, handleKeyboardEvent }) => {
 const { state } = useContext(AppContext)
 const KEYBOARD_CHARS = state.difficulty.operators

 // speech recognition
 const { listening, transcript, resetTranscript, browserSupportsSpeechRecognition } =
  useSpeechRecognition()

 const startListening = () => {
  if (!browserSupportsSpeechRecognition) {
   alert('This browser does not support speech recognition.')
   return
  }
  SpeechRecognition.startListening({
   continuous: true,
   language: 'en-GB',
  })
 }
 useEffect(() => {
  if (transcript !== '') {
   console.log('Got final result:', transcript)
   let lastWord = transcript.split(' ')[transcript.split(' ').length - 1].toLowerCase()
   if (/^[0-9)(*/^+-]$/.test(lastWord)) {
    handleKeyboardEvent(lastWord)
    resetTranscript()
   }
   if (/^[0-9)(*/^+-]$/.test(transcribeKeys[lastWord])) {
    handleKeyboardEvent(transcribeKeys[lastWord])
    resetTranscript()
   }
   if (lastWord.toLowerCase() === 'enter' || lastWord.toLowerCase().indexOf('end') !== -1) {
    handleKeyboardEvent('Enter')
    resetTranscript()
   }

   if (
    (lastWord.toLowerCase().indexOf('back') !== -1 &&
     transcript.toLowerCase().indexOf('bracket') === -1) ||
    (lastWord.toLowerCase().indexOf('clear') !== -1 &&
     transcript.toLowerCase().indexOf('bracket') === -1)
   ) {
    handleKeyboardEvent('Backspace')
    resetTranscript()
   }

   if (transcript.indexOf('open') !== -1 && transcript.indexOf('bracket') !== -1) {
    handleKeyboardEvent('(')
    resetTranscript()
   }

   if (transcript.indexOf('close') !== -1 && transcript.indexOf('bracket') !== -1) {
    handleKeyboardEvent(')')
    resetTranscript()
   }
  }
 }, [transcript])

 return (
  <div className={style.keyboard}>
   {KEYBOARD_CHARS.map((char, i) => (
    <button
     type='button'
     key={i}
     onClick={() => handleKeyboardEvent(char)}
     className={style[usedKeys.get(char) as string]}
    >
     <span>{char}</span>
    </button>
   ))}
   {listening ? (
    <button type='button' className={style.listen_button} onClick={SpeechRecognition.stopListening}>
     <FaRegStopCircle />
    </button>
   ) : (
    <button type='button' className={style.listen_button} onClick={() => startListening()}>
     <AiOutlineAudio />
    </button>
   )}
  </div>
 )
}

export default Keyboard
