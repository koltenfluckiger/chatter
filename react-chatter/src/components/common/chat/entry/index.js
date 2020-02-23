import React, {Component} from 'react';
import {withSocketContext, withUserContext} from "../../../higher-order-components";

import styles from "./entry.module.css";

class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  componentDidMount() {}

  onKeyUp(e) {
    if (e.keyCode === 13) {

      const socket = this.props.socket;
      const username = this.props.username;

      socket.emit("message", {username: username, message: e.target.value})

      e.target.value = "";
    }
    else{
      this.setState({value: e.target.value});
    }
  }

  render() {
    const {onKeyUp, onSubmit} = this;
    const {value} = this.state;
    return (<div className={styles.inputContainer}>
      <input onKeyUp={(e) => onKeyUp(e)} className={styles.input} type="text" placeholder="Message"></input>
    </div>)
  }
}

export default withUserContext(withSocketContext(Entry));
