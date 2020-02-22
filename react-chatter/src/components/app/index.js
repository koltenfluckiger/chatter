import React, {Component} from 'react';
import socketIOClient from "socket.io-client";

import "./index.css";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      connected: false,
      host: '127.0.0.1'
    }
  }

  componentDidMount(){
    const socket = socketIOClient("http://localhost:3000");
    socket.on("connection", socket => {
      console.log(socket);
    })
  }

  render() {
    return (
    <div></div>
    )
  }
}

export default App;
