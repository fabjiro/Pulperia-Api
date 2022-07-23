const { server, database } = require("./configs");
const { dropbox, Socket } = require("./services");

(async () => {
  let con = await database(process.env.DBURI);
  dropbox.config(process.env.DBTOKEN);

  const listener = server.listen(server.get("port"), "0.0.0.0", () => {
    console.log(`-> Server on http://localhost:${server.get("port")}/\n\n`);
  });

  Socket.config(listener);

  Socket.io.on("connection", (socket) => {
    console.log("nueva coneccion -> " + socket.id);
  });
})();
