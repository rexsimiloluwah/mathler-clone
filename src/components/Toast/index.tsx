import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";
import { CSSTransition } from "react-transition-group";
import style from "./index.module.css";

export interface IToastOverlayProps{
    toggleToast?: () => void;
    children?: React.ReactNode;
    background: string;
}

export interface IToastProps{
    toggleToast?: () => void;
    isOpen: boolean;
    children?: React.ReactNode;
    background: string;
}

const ToastOverlay:React.FC<IToastOverlayProps> = ({children,toggleToast,background}) => {
  const content = (
    <div className={style.toast} style={{background:background}}>
      <div className={style.toast__content}>{children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("toast-hook") as Element);
};

const Toast:React.FC<IToastProps> = ({toggleToast,isOpen,children,background}) => {
  return (
    <>
      <CSSTransition
        in={isOpen}
        mountOnEnter
        unmountOnExit
        timeout={50}
        classNames="toast"
      >
        <ToastOverlay toggleToast={toggleToast} background={background}>
            {children}
        </ToastOverlay>
      </CSSTransition>
    </>
  );
};

export default Toast;