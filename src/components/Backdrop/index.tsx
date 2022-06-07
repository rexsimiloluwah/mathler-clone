import React from 'react'
import ReactDOM from 'react-dom'

import style from './index.module.css'

export interface IBackdropProps {
 handleClick: () => void
}

const Backdrop: React.FC<IBackdropProps> = ({ handleClick }) => {
 return ReactDOM.createPortal(
  <div className={style.backdrop} onClick={handleClick}></div>,
  document.getElementById('backdrop-hook') as Element,
 )
}

export default Backdrop
