const Sequelize = require("sequelize");
const db = require("../db");

const LastChecked = db.define("lastcheckin", {
  lastChecked: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = LastChecked;
