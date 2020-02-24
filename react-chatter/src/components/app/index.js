import React, {Component} from 'react';
import {UserContext} from '../../contexts';
import {withSocketContext, withUserContext} from "../higher-order-components";
import {Chat, Container} from "../common";

import "./index.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: false,
      username: null,
      typing: null
    }
  }
  setUserName() {
    var username = window.prompt("What is your name?");
    username = username === null
      ? "Guest" + String((Math.floor(Math.random() * 1000)))
      : username;
      username = username === ""
        ? "Guest" + String((Math.floor(Math.random() * 1000)))
        : username;
    this.setState({username: username});
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    if (this.state.username === null) {
      this.setUserName();
    }
    var self = this;
    const socket = this.props.socket;
    socket.emit("load");
    socket.on("messages", data => {
      self.setState({messages: data});
    })
    socket.on("message", data => {
      self.setState({messages: data});
    })
    socket.on("onChange", data => {
      self.setState({typing: data.username});
    })
    socket.on("onBlur", data => {
      self.setState({typing: null});
    })
    this.scrollToBottom();
  }

  render() {
    const {messages, username, typing} = this.state;
    return (<UserContext.Provider value={username}>
      <Container>
        <Container.SubContainer variant={{
            classes: "subcontainer center"
          }}>
          <Chat>
            {
              messages.map(
                message => message.username !== username
                ? <Chat.Message text={message.content} username={message.username} incoming="incoming"/>
                : <Chat.Message text={message.content} username={message.username} outgoing="outgoing"/>)
            }
            <div style={{
                float: "left",
                clear: "both"
              }} ref={(el) => {
                this.messagesEnd = el;
              }}></div>
          <Chat.Typing username={typing}/>
          </Chat>
          <Chat.Entry/>
        </Container.SubContainer>
      </Container>
    </UserContext.Provider>)
  }
}

export default withSocketContext(App);
