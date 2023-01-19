const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://nikhil:nikhil@cluster0.ih0wouv.mongodb.net/mock11?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("error in connection");
      } else {
        console.log("mongodb is connected");
      }
    }
  );
};

module.exports = connect;
