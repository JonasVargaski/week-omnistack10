import socketio from 'socket.io';
import parseStringAsArray from './utils/parseStringAsArray';
import calculateDistance from './utils/calculateDistance';

let io;

export const connections = [];

export const setupWebsocket = server => {
  io = socketio(server);

  io.on('connect', socket => {

    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};

export const findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(tech => techs.includes(tech))
    );
  });
};

export const sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
