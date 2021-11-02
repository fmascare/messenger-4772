const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const LastChecked = require("./lastChecked");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

LastChecked.belongsTo(User, { as: "user" });
LastChecked.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  LastChecked
};
