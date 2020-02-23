const mongoose = require("mongoose");

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const ip = process.env.DB_IP;

mongoose.message_conn = mongoose.createConnection("mongodb://" + username + ":" + password + "@" + ip + ":27017/chatter_messages?authSource=admin", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const messageSchema = new mongoose.Schema({
  _id: Number,
  content: String,
  userId: Number,
  time: new Data(),
  read: Boolean,
  delivered: Boolean

}, {_id: false})

module.exports = mongoose.message_conn.model("model", messageSchema);
