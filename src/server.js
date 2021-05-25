const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./services/utilities/errorHandling");

const server = express();
const port = process.env.PORT || 3002;

server.use(express.json({ limit: "50mb" }));
server.use(cors());
server.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 50000,
  })
);


server.use(express.json());

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
