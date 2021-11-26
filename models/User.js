const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connection = mongoose.createConnection(
  "mongodb://xchdtk12:xwlstn1234@localhost:27017/people"
);
autoIncrement.initialize(connection);
const userSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  password: {
    type: String,
    minlength: 50,
  },
  name: {
    type: String,
    maxlength: 10,
  },
});

userSchema.plugin(autoIncrement.plugin, {
  model: "user",
  field: "id", // auto-increment할 field
  startAt: 0, // 0에서 부터
  increment: 1, // 1씩 증가
});
const User = connection.model("user", userSchema);

module.exports = mongoose.model("User", userSchema);
