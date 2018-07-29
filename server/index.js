import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';

import dbConfig from './config/db';

import middlewaresConfig from './config/middlewares';
import { generateMessage } from './utils/message';
import { isRealString } from './utils/validation';
import { Users } from './utils/users';
import Message from './modules/message/model';
import { CategoryRoutes, ProductRoutes, UserRoutes , AdmnRoutes, BranchRoutes, CustomerRoutes, OrderRoutes, ProducerRoutes, ReceiptRoutes, MessageRoutes} from './modules';

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(cors());
/**
 * Database
 */
dbConfig();

/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [CategoryRoutes, ProductRoutes, UserRoutes , AdmnRoutes, BranchRoutes, CustomerRoutes, OrderRoutes, ProducerRoutes, ReceiptRoutes, MessageRoutes]);

const PORT = process.env.PORT;

server.listen(PORT, err => {
  if (err) {
    console.error(err);
  } {
    console.log(`App listening on port: ${PORT}`);
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.room)) {
      return callback('có lỗi xảy ra, không thể kết nối với người hỗ trợ');
    }

    console.log('room: ', params.room);
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.fromId, params.toId, params.room);

    callback();
  });

  socket.on('adminJoin', (params, callback) => {
    if (!isRealString(params.id)) {
      return callback('có lỗi xảy ra');
    }
    socket.join(params.id);
    callback();
  })

  socket.on('createMessage', async (message, callback) => {
    var user = users.getUser(socket.id)

    if (user && isRealString(message.text)) {
      // save to Message
      var message = new Message({ 
        from: user.fromId,
        to: user.toId,
        text: message.text,
        room: user.room,
        createdAt: new Date().getTime()
      });

      var msg = await message.save();

      io.to(user.room).emit('newMessage', generateMessage(msg._id, user.fromId, user.toId, message.text, user.room));
      io.to(user.toId).emit('newInComeMessage', { from: user.fromId });
    }

    callback();
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    console.log('User disconnected');
  })
})
