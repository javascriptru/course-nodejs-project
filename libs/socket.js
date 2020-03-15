const socketIO = require('socket.io');

function socket(server) {
  const io = socketIO(server);

  io.on('connection', socket => {
    socket.on('message', async (msg) => {
      setTimeout(() => {
        socket.emit('message', {
          text: 'Привет, я тут сам пока ещё не разобрался ☺️',
          user: 'Администратор',
          date: msg.date + 2000,
          id: msg.date + 2000,
        });
      }, 2000);
    });
  });

  return io;
}

module.exports = socket;
