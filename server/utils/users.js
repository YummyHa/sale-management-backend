class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, fromId, toId, room) {
    var user = {id, fromId, toId, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id)
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room)
    var idsArray = users.map((user) => user.fromId)
    return idsArray
  }
} 

module.exports = {Users}
