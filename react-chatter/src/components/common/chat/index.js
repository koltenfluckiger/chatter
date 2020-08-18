import React, {Component} from 'react';
import {withChildren} from "../../higher-order-components";

import Entry from "./entry";
import Message from "./message";
import Typing from "./typing";

import styles from "./chat.module.css";

const Chat = withChildren(class extends Component {

  render() {
    const {render} = this.props;
    return (
      <div className={styles.container}>{render}</div>
    )
  }
}
)
Chat.Typing = Typing;
Chat.Entry = Entry;
Chat.Message = Message;

export default Chat;
