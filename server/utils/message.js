var generateMessage = (_id, from, to, text, room) => {
  return {
    _id,
    from,
    to,
    text,
    room,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage};
