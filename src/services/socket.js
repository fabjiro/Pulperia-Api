const SocketIO = require("socket.io");

module.exports = {
  io: null,
  config: function (server) {
    if (!this.io) {
      this.io = SocketIO(server, {
        cors: {
          origins: "*:*",
          method: ["GET", "POST", "PUT", "PATCH"],
        },
        transports: ["websocket", "polling", "flashsocket"],
        reconnection: false,
        handlePreflightRequest: (req, res) => {
          res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Credentials": true,
          });
          res.end();
        },
      });
    }
    return this.io;
  },
};
