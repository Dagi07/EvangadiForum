const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/database");
const userRouter = require("./api/users/user.router");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Listening at http://${DB_HOST}:${port}`));
