require("./globals");

const Path = require("path");
const Express = require("express");
const HTTP = require("http");
const SocketIO = require("socket.io");
const Cors = require("cors");
const App = Express();

const Server = HTTP.createServer(App);
const IO = SocketIO(Server);

var messages = [];
var users = [];

IO.on("connection", socket => {

    socket.on("load", () => {
        socket.emit("users", Object.keys(IO.sockets.sockets).length)
        socket.emit("messages", messages);
    })

    socket.on("conn", username => {
        users.push(username);
        IO.emit("users", users);
        console.log(users);
    })

    socket.on("message", data => {
        messages.push({username: data.username, content: data.message})
        IO.emit("message", messages)
    })

    socket.on("onChange", data => {
        socket.broadcast.emit("onChange", {username: data.username})
    })

    socket.on("onBlur", data => {
        socket.broadcast.emit("onBlur", data.username)
    })

})

App.use(Express.static(global.buildPath));
App.get("/*", (req, res) => {
    return res.sendFile(global.buildPath + "/index.html");
});

Server.listen(3010, "0.0.0.0");
