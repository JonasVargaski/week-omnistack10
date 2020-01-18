import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.120:3333', {
  autoConnect: false,
});

export function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

export function subscribeToRemoveDev(subscribeFunction) {
  socket.on('remove-dev', subscribeFunction);
}

export function connect(opts) {
  socket.io.opts.query = opts;

  socket.connect();
}

export function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export default socket;
