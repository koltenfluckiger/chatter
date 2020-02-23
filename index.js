const Path = require("path");
const Express = require("express");
const HTTP = require("http");
const SocketIO = require("socket.io");
const Cors = require("cors");
const App = Express();


App.use(Express.static(Path.join(__dirname, "react-chatter", "public")));
App.use(Cors());
const Server = HTTP.createServer(App);
const IO = SocketIO(Server);

var messages = [];

IO.on("connection", socket => {

  socket.on("message", data => {
    messages.push({username: data.username, content: data.message})
    IO.emit("message", messages)
  })

  socket.on("load", () => {
    socket.emit("messages", messages);
  })
})

Server.listen(3001, "localhost");
