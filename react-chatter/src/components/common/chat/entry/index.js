import React, {Component} from 'react';
import {withSocketContext, withUserContext} from "../../../higher-order-components";

import styles from "./entry.module.css";

class Entry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.finshedTyping = this.finshedTyping.bind(this);
    }

    onBlur() {
        const socket = this.props.socket;
        socket.emit("onBlur", {username: null});
    }

    onChange() {
        var timer;
        var timerInterval = 5000;
        const socket = this.props.socket;
        const username = this.props.username;
        socket.emit("onChange", {username: username});
        setTimeout(this.finshedTyping, timerInterval);
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            const socket = this.props.socket;
            const username = this.props.username;
            socket.emit("message", {
                username: username,
                message: e.target.value
            })
            e.target.value = "";
        } else {
            this.setState({value: e.target.value});
        }
    }

    finshedTyping(){
        const socket = this.props.socket;
        socket.emit("onBlur", {username: null});
    }

    render() {
        const {onKeyUp, onChange, onBlur} = this;
        return (<div className={styles.inputContainer}>
            <input onKeyUp={(e) => onKeyUp(e)} onChange={onChange} onBlur={onBlur} className={styles.input} type="text" placeholder="Message"></input>
        </div>)
    }
}

export default withUserContext(withSocketContext(Entry));
