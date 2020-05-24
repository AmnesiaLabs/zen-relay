const VERBOSE = true;
const PORT = process.argv[2];

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { pingInterval: 2000 });
const cors = require("cors");
app.use(cors());

const logger = function (l) {
  if (!VERBOSE) return;
  console.log(l);
};

const strings = {
  failedLogin:
    "Failed to connect, please try different connection parameters or contact relay operator.",
};

let guests = [];

io.sockets.on("connection", function (socket) {
  guests.push({
    id: socket.id,
    name: "",
    rooms: socket.rooms,
    handshake: socket.handshake,
  });

  logger(`${socket.id} connected`);

  socket.on("disconnect", () => {
    logger(`${socket.id} disconnected`);
    guests.forEach((s) => {
      if (s.id == socket.id) {
        io.to(`${s.name}`).emit(
          "peerLeft",
          guests.filter((g) => g.id !== socket.id)
        );
      }
    });

    guests = guests.filter((g) => g.id !== socket.id);
  });

  socket.on("client:authenticate", (data, ack) => {
    logger(`${socket.id} authenticating...`);
    if (!data.uuid) return;
    socket.join(data.uuid);
    ack(200);
  });

  socket.on("client:setName", (data, ack) => {
    logger(`${socket.id} setting name to ${data}.`);
    guests.forEach((sock) => {
      if (sock.id == socket.id) {
        socket._name = data;
        sock.name = data;
        sock.softwareInfo = socket._softwareInfo;
        io.to(`${socket.rooms[socket._name]}`).emit(
          "peerJoined",
          guests.filter((x) => x.name == data)
        );
      }
    });
    ack(200);
  });

  // allows client to disconnect themselves
  socket.on("client:disconnect", function (data) {
    socket.disconnect();
  });

  // bridge to client
  // two-way data
  socket.on("raw", function (data) {
    socket.to(`${socket.rooms[socket._name]}`).emit("raw", data);
  });
});

app.get("*", function (req, res, next) {
  res.json({
    error:
      "This isn't an HTTP server... Plus, wait a minute?! What are you even doing here?",
    activity_logged: true,
  });
});

http
  .listen(PORT, () => {
    console.log("zen-relay is now listening on http://localhost:" + PORT);
  })
  .on("error", (err) => {
    console.log(err);
    return console.error(
      "Exited. Requested listening address is already in use."
    );
  });
