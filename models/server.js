const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http servr
    this.server = http.createServer(this.app);

    //Configuracion de socket
    this.io = socketIo(this.server, {
      /* Configuraciones*/
    });
  }
  middlewares() {
    // Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    // CORS
    this.app.use(cors());
  }

  configurarSocket() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSocket();

    // Inicializar server
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
