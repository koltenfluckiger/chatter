import React, {Component} from 'react';

import styles from "./message.module.css";

class Message extends Component {

    render() {
        const {text, username} = this.props;
        const {incoming, outgoing} = this.props;
        if (incoming) {
            return (<div style={{
                    width: "fit-content",
                    alignSelf: "flex-start"
                }}>
                <div className={styles.start}>
                    <div className={styles.incoming}>
                        <span>{text}</span>
                    </div>
                    <span className={styles.usernameLeft}>{username}</span>
                </div>
            </div>)
        } else if (outgoing) {
            return (<div style={{
                    width: "fit-content",
                    alignSelf: "flex-end"
                }}>
                <div className={styles.end}>
                    <div className={styles.outgoing}>
                        <span>{text}</span>
                    </div>
                    <span className={styles.usernameRight}>{username}</span>
                </div>
            </div>)
        }
    }
}

export default Message;
