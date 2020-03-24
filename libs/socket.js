const socketIO = require('socket.io');
const Session = require('../models/Session');

function socket(server) {
  const io = socketIO(server);
  
  io.use(async function(socket, next) {
    const headers = socket.handshake.headers;
    const authorization = headers['authorization'];
    
    if (!authorization) return next();
    
    const token = authorization.split(' ')[1];
    
    if (!token) return next();
    
    const session = await Session.findOne({token}).populate('user');
    
    if (!session) return next();
    
    socket.user = session.user;
    
    next();
  });

  io.on('connection', socket => {
    socket.on('message', async (msg) => {
      setTimeout(() => {
        socket.emit('message', {
          text: `Привет${socket.user ? ', ' + socket.user.displayName : ''}! Менеджеров сейчас нет на месте, это ведь учебный проект 😉️`,
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
