import React, {Component} from 'react';
import ClassMapper from "sass-css-modules-class-mapper";

import styles from "./message.module.css";

class Message extends Component {

  constructor(props) {
    super(props);
    this.variant = ClassMapper.map(styles, props.variant);
    this.incoming = props.incoming;
    this.outgoing = props.outgoing;
  }

  render() {
    const {render, text,username} = this.props;
    const {variant,incoming, outgoing} = this;
    if(incoming){
      return (<div className={styles.start}><div className={styles.incoming}><span>{text}</span></div><span className={styles.usernameLeft}>{username}</span></div>)
    }
    else {
      return (<div className={styles.end}><div className={styles.outgoing}><span>{text}</span></div><span className={styles.usernameRight}>{username}</span></div>)
    }
  }
}

export default Message;
