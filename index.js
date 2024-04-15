require("dotenv").config()
const express = require("express");
const Connection = require("./Database/Database.js");
const userRouter = require("./Routes/userRoutes.js");

const server = express();

server.use(express.json());

Connection();

server.use("/", userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
