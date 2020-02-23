const mongoose = require("mongoose");

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const ip = process.env.DB_IP;

mongoose.user_conn = mongoose.createConnection("mongodb://" + username + ":" + password + "@" + ip + ":27017/chatter_users?authSource=admin", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  id: Number,
  messages: {
    type: [Number],
    ref: 'model'
  }
}, {_id: false})

module.exports = mongoose.user_conn.model("model", userSchema);
