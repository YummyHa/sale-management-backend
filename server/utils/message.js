var generateMessage = (from, to, text, room) => {
  return {
    from,
    to,
    text,
    room,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage};
