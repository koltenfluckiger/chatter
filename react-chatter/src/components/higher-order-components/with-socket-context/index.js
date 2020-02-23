import React, {Component} from "react";
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import {SocketContext} from "../../../contexts";

const IO = socketIOClient();

const withSocketContext = (ParentComponent) => {
  return class extends Component {

    render() {
      return (<SocketContext.Consumer>{context => <ParentComponent {...this.props} socket={context}/>}</SocketContext.Consumer>)
    }
  }
}

export default withSocketContext;
