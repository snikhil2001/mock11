const express = require("express");
const connect = require("./config/db");
const userRouter = require("./users/user.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8080, async () => {
  await connect();
  console.log(`listening on http://localhost:8080`);
});
