import React from 'react'
import ReactDOM from 'react-dom'
import Backdrop from '../Backdrop'
import { CSSTransition } from 'react-transition-group'
import { HiOutlineX } from 'react-icons/hi'
import style from './index.module.css'

export interface IModalOverlayProps {
 toggleModal: () => void
 children?: React.ReactNode
}

export interface IModalProps {
 toggleModal: () => void
 isOpen: boolean
 children?: React.ReactNode
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ children, toggleModal }) => {
 const content = (
  <div className={style.modal}>
   <HiOutlineX size={24} onClick={toggleModal} />
   <div className={style.modal__content}>{children}</div>
  </div>
 )

 return ReactDOM.createPortal(content, document.getElementById('modal-hook') as Element)
}

const Modal: React.FC<IModalProps> = ({ toggleModal, isOpen, children }) => {
 return (
  <>
   {isOpen ? <Backdrop handleClick={toggleModal}></Backdrop> : ''}

   <CSSTransition in={isOpen} mountOnEnter unmountOnExit timeout={50} classNames='modal'>
    <ModalOverlay toggleModal={toggleModal}>{children}</ModalOverlay>
   </CSSTransition>
  </>
 )
}

export default Modal
