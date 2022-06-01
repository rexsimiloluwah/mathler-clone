import React, { useContext, useState } from "react";
import {HiCog,HiRefresh} from "react-icons/hi";
import Modal from "../Modal";
import Settings from "../Settings";
import { AppContext } from "../../context/store";

import style from "./index.module.css";
import classNames from "classnames";

const Header:React.FC = () => {
    const [settingsOpen,setSettingsOpen] = useState(false);
    const {state} = useContext(AppContext);

    return(
        <>
        <div className={classNames(style.header,style[state.difficulty.mode.toLowerCase()])}>
            <HiCog size={30} onClick={() => setSettingsOpen(true)}/>
            <h1><small>{state.difficulty.mode}</small>MATHLER</h1>
            <HiRefresh size={30} onClick={() => window.location.reload()}/>
        </div>

        <Modal isOpen={settingsOpen} toggleModal={() => setSettingsOpen(!settingsOpen)}>
            <Settings closeSettings={() => setSettingsOpen(!settingsOpen)}/>
        </Modal>
        </>
    )
}

export default Header;