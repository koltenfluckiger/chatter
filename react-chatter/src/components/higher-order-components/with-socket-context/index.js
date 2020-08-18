import React, {Component} from "react";
import {SocketContext} from "../../../contexts";

const withSocketContext = (ParentComponent) => {
  return class extends Component {

    render() {
      return (<SocketContext.Consumer>{context => <ParentComponent {...this.props} socket={context}/>}</SocketContext.Consumer>)
    }
  }
}

export default withSocketContext;
