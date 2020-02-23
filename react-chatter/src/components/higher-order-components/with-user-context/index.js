import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {UserContext} from "../../../contexts";

const withUserContext = (ParentComponent) => {
  return class extends Component {

    render() {
      return (<UserContext.Consumer>{username => <ParentComponent {...this.props} username={username}/>}</UserContext.Consumer>)
    }
  }
}

export default withUserContext;
