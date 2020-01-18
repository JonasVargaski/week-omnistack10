import express from 'express';
import cors from 'cors';
import http from 'http';
import { setupWebsocket } from './webSocket';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    setupWebsocket(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
