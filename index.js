const VERBOSE = false;
let PORT;

const defaults = {
  port: 8080,
};

const strings = {
  failedLogin:
    "Failed to connect, please try different connection parameters or contact relay operator.",
  infoString: "zen-relay v." + require("./package.json").version,
  listening: "zen-relay is now listening on http://localhost:<PORT>",
  alreadyInUse: "Exited. Requested listening address is already in use.",
  noPort: "No port specified, defaulting to http://localhost:8080...",
};

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { pingInterval: 2000 });
const cors = require("cors");

const logger = function (l) {
  if (!VERBOSE) return;
  console.log(l);
};

if (!process.argv[2]) console.error(strings.noPort);
PORT = process.argv[2] ? process.argv[2] : defaults.port;

// keep track of connected clients
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
    if (!data.uuid) return ack(500);
    socket.join(data.uuid);
    ack(200);
  });

  socket.on("client:setName", (data, ack) => {
    logger(`${socket.id} set UUID room`);
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

  socket.on("raw", function (data) {
    socket.to(`${socket.rooms[socket._name]}`).emit("raw", data);
  });
});

app.get("/stats", function (req, res) {
  res.json({
    connected_clients: guests.length,
    health: "ok",
  });
});

app.use(function (req, res, next) {
  res.status(404).send(strings.infoString);
});

app.use(cors());

http
  .listen(PORT, () => {
    console.log(strings.listening.replace("<PORT>", PORT));
  })
  .on("error", (err) => {
    console.log(err);
    return console.error(strings.alreadyInUse);
  });
