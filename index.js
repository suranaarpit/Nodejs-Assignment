const express = require("express");
require("dotenv").config({ path: "./.env" });
const connection = require("./Database/db");
const helmet = require("helmet");
const MainRouter = require("./Routes/Main.route");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`API Server started on localhost:${PORT}`);
});
server.use("/", MainRouter);
const PORT = process.env.PORT || 8080;

server.listen(PORT, async () => {
  await connection;
  console.log("Connected to Database");
  console.log(`🌎 started on http://localhost:${PORT}/`);
});
