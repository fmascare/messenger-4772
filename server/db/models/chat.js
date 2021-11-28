const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  chatName: {
    type: Sequelize.STRING,
  },
});

module.exports = Chat;
