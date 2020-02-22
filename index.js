const Path = require("path");
const Express = require("express");
const HTTP = require("http");
const SocketIO = require("socket.io")

const App = Express();

App.use(Express.static(Path.join(__dirname, "react-chatter", "public")));
const Server = HTTP.createServer(App);
const IO = SocketIO(Server);

IO.on("connection", socket => {
  console.log("connected");
  socket.emit("connection", {data: "Asdfasdfasdf"})
})

IO.on("chat", socket => {
  socket.emit()
})

Server.listen(3001, "localhost");
