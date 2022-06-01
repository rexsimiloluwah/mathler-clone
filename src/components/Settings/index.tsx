import classNames from "classnames";
import React, { useContext } from "react";
import { DIFFICULTY, IDifficulty } from "../../constants";
import { AppContext } from "../../context/store";

import style from "./index.module.css";

export interface ISettingsProps{
    closeSettings: () => void; 
}

const Settings:React.FC<ISettingsProps> = ({closeSettings}) => {
    const {dispatch} = useContext(AppContext);

    const setDifficulty = (difficulty:IDifficulty) => {
        dispatch({
            type: "SET_DIFFICULTY",
            payload: difficulty,
        })
        closeSettings();
        // console.log("Difficulty changed.")
    }
    return(
        <div>
            <h3>Select Difficulty</h3>
            {
                DIFFICULTY.map((obj,i) => (
                    <div key={i} className={classNames(style.difficulty,style[obj.mode.toLowerCase()])} onClick={()=>setDifficulty(obj)}>
                        <h4>{obj.mode}</h4>
                        <p>{obj.description}</p>
                    </div>
                ))
            }

            <h4>Created by El Tigre ❤️️.</h4>
            <p>Kindly play the <a href="https://mathler.com">Original Mathler</a> for a better experience.</p>
        </div>
    )
}

export default Settings;