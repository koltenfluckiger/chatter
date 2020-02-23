import React, {Component} from 'react';
import {withChildren} from "../../higher-order-components";

import Container from "./container";
import Entry from "./entry";
import Message from "./message";

import styles from "./chat.module.css";

const Chat = withChildren(class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {render} = this.props;
    return (
      <div className={styles.container}>{render}</div>
    )
  }
}
)
Chat.Container = Container;
Chat.Entry = Entry;
Chat.Message = Message;
export default Chat;
