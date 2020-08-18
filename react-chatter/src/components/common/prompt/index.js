import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../../contexts";
import styles from "./prompt.module.css";

const Prompt = () => {

    return (<UserContext.Consumer>
        {
            setCurrentUser => (<div className={styles.container}>
                <div className={styles.subcontainer}>
                    <form onSubmit={setCurrentUser}>
                        <div className={styles.inputContainer}>
                            <input className={styles.input} name="username" type="text" placeholder="Username"/>
                        </div>
                        <div className={styles.buttonContainer}>
                            <div className={styles.cancel}>
                                <button type="submit" className={styles.cancelButton}><span>CANCEL</span></button>
                            </div>
                            <div className={styles.ok}>
                                <button type="submit" className={styles.okButton}><span>OK</span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>)
        }
    </UserContext.Consumer>)
}
export default Prompt;
