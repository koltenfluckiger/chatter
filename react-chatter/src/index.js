import React from "react";
import ReactDOM from "react-dom";
import {SocketContext, UserContext} from './contexts';

import socketIOClient from "socket.io-client";

import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
const IO = socketIOClient("http://192.168.1.56:3000");

ReactDOM.render(<SocketContext.Provider value={IO}>
  ><App/>
</SocketContext.Provider>, document.getElementById("root"));

serviceWorker.unregister()
