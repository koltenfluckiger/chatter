import React, {Component} from 'react';
import {withSocketContext, withUserContext} from "../higher-order-components";
import {Chat, Container} from "../common";

import "./index.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: false
    }
  }

  componentDidMount() {
    var self = this;
    const socket = this.props.socket;
    socket.emit("load");
    socket.on("messages", data =>{
      self.setState({messages: data});
    })
    socket.on("message", data => {
      self.setState({messages: data});
    })
  }

  render() {
    const {messages} = this.state;
    return (<Container>
      <Container.SubContainer variant={{
          classes: "subcontainer center"
        }}>
        <Chat>
          {
            messages.map(
              message => message.username !== this.props.username
              ? <Chat.Message text={message.content} username={message.username} incoming/>
              : <Chat.Message text={message.content} username={message.username} outgoing/>)
          }
        </Chat>
        <Chat.Entry/>
      </Container.SubContainer>
    </Container>)
  }
}

export default withUserContext(withSocketContext(App));
