const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/database");
const userRouter = require("./api/users/user.router");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from any origin
      callback(null, true);
    },
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, () =>
  console.log(`Listening at http://${process.env.DB_HOST}:${port}`)
);
