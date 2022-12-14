require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const Socket = require("socket.io");
const io = Socket(server);

var bodyParser = require('body-parser');


const users = require('./routes/users.js');

app.use(bodyParser.json());
app.use("/user", users);


mongoose.connect(process.env.CONNECTION_URL).then(() => {
    server.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.log(error.message);
});

var clients = {};

io.on("connection", socket => {
    console.log("SOCKETS" ,socket.id);
    socket.emit("connected", socket.id);
    socket.on("join", (data) => {
        if(clients[data]){
            delete clients[data];
            clients[data] = socket;
        }else{
            clients[data] = socket;
        }
    });
    socket.on("message", (data) => {
        console.log(data);
        if (clients[data.id]) clients[data.id].emit("message", data);
    });
});

app.get("/", (res, req) => {
    req.send({
        "port": port
    });
});