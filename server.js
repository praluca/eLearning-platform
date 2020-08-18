const express = require("express");
const connectDB = require("./config/db");
const socketio = require("socket.io");
const http = require("http");
const { constants } = require("buffer");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { use } = require("./routes/api/user");

const app = express();
//socket
const server = http.createServer(app);
const io = socketio(server);

//Connect DB
connectDB();
//Init middleware
app.use(express.json({ extended: false }));
app.use(express.static("publicVideo"));

app.get("/", (req, res) => res.send("API Running"));

//Define routes
//corssss
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.use("/api/students", require("./routes/api/students"));
app.use("/api/studentsAuth", require("./routes/api/authStudents"));

app.use("/api/courses", require("./routes/api/courses"));
app.use("/api/added", require("./routes/api/addedCourses"));
app.use("/api/addedQuizzes", require("./routes/api/addedQuizzes"));
app.use("/api/addedAssignments", require("./routes/api/addedAssigments"));

app.use("/api/quizzes", require("./routes/api/quizz"));

app.use("/api/assignments", require("./routes/api/assignment"));

app.use("/api/mycourses", require("./routes/api/mycourses"));
app.use("/api/myquizresults", require("./routes/api/quizResults"));
const PORT = process.env.PORT || 5000;

//socket
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
