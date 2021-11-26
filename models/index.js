const mongoose = require('mongoose');

const connect =  () => {
    mongoose
  .connect("mongodb://xchdtk12:xwlstn1234@localhost:27017/people", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
}

module.exports = connect;