const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')
// Router middleware.
const router = require("./router");

// Helpers
const { addUser, removeUser, findUser, getUsersInRoom } = require('./user');

//Port for the application. Use ENV_VAR if exists, if not, use port 5000.
const PORT = process.env.PORT || 5000;
// Enable cors for the socketio.
const corsOptions = {
    cors: true,
    origins: ['http://localhost:3000']
}
const app = express();
const server = http.createServer(app);
const io = socketio(server, corsOptions);


io.on('connection', (socket) => {

    console.log("We have a new connection!")
    
    // Socket.on function has a third parameter which is a callback function.
    // It can be used to return information to the client.
    socket.on('join', ({name, room}, callback) => {
        
        const { user, error } = addUser({ id: socket.id, name, room });
        if(error) {
            return callback(error);
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room!` })
        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback) => {

        const user = findUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, message })

        callback();
    })
    
    socket.on('disconnect', () =>{
        console.log('User just disconnected.')
    })
    
})

// Applying ROUTE middleware to the application
app.use(cors())
app.use(router);
server.listen(PORT, () => console.log(`The app has started at port ${PORT}`))