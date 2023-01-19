const express = require("express");
const User = require("./user.model");
const argon2 = require("argon2");
const app = express.Router();
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  return res.send("user route");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.send({ message: "user already registered,please login" });
    }
    const hash = await argon2.hash(password);
    const newuser = await User.create({ email, password: hash });
    return res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const verify = await argon2.verify(user.password, password);

  if (!verify) {
    return res.status(403).send({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
    },
    "secret",
    {}
  );

  return res.send({ message: "login success", token });
});

module.exports = app;
