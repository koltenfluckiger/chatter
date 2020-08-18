import React, {Component} from 'react';
import styles from "./typing.module.css";

class Typing extends Component {

  render() {
    const {username} = this.props;
    if (username === null){
      return null
    }
    return (
    <p className={styles.typing}>{username} is typing...</p>
    )
  }
}

export default Typing;
