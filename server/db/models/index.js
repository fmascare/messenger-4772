const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");

// associations

Message.belongsTo(Conversation, { as: "conversation" });
Conversation.hasMany(Message);
Participant.belongsTo(Conversation, { as: "conversation" });
Conversation.hasMany(Participant);
Participant.belongsTo(User, { as: "user" });

module.exports = {
  User,
  Conversation,
  Message,
  Participant
};