import React, { useContext } from "react";
import { AppContext } from "../../context/store";
import style from "./index.module.css";

export interface IKeyboardProps{
    usedKeys: Map<string,string>;
    handleKeyboardEvent: (char:string) => void;
}

const Keyboard:React.FC<IKeyboardProps> = ({usedKeys,handleKeyboardEvent}) => {
    const {state} = useContext(AppContext);
    const KEYBOARD_CHARS = state.difficulty.operators;

    return(
        <div className={style.keyboard}>
            {
                KEYBOARD_CHARS.map((char,i) => (
                    <div key={i} onClick = {() => handleKeyboardEvent(char)} className={style[usedKeys.get(char) as string]}>{char}</div>
                ))
            }
        </div>
    )
}

export default Keyboard;