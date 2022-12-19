import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { env } from './env';

const httpServer = createServer();
const socketIO = new Server(httpServer, {
  cors: {
    origin: env.serverUrl,
    // allowedHeaders: ['my-custom-header'],
    // credentials: true,
  },
});

// Use Socket.IO to handle websocket connections
socketIO.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('ping', (cb: () => void) => {
    console.log('ping');
    cb();
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

httpServer.listen(env.serverPort, () => {
  console.log(`Server listening on ${env.serverPort}`);
});
