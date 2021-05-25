const users = [];

const addUser = ({ id, name, room}) => {
    room = room.trim().toLowerCase();

    // We verify if the user exists in the first play. If it does, return an error.
    const doesNameExists = users.find((user) => user.name === name && user.room === room);

    if(doesNameExists) {
        return { 
            error: 'Name is already taken'
        }
    }

    // We creater a new user object and add it to the array.
    const user = { id, name, room};
    users.push(user)
    return { user };
}

const removeUser = (id) => {

    const index = users.findIndex((user) => user.index === index);
    if(index !== -1) {
        return users.splice(index, 1)[0]; 
    }

    return { error: `No user with ID: ${id}`}
}

const findUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.find((user) => user.room === room);
}

const getAmountOfUsersInRoom = (room) => {
    return users.find((user) => user.room === room).length;
}

module.exports = {
    addUser,
    removeUser,
    findUser,
    getUsersInRoom,
    getAmountOfUsersInRoom
}