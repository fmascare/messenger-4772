const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Chat = require("./chat");
const Participant = require("./participant");
const Post = require("./post");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// new model associations

Post.belongsTo(Chat, { as: "chat" });
Chat.hasMany(Post);
User.belongsToMany(Chat, { through: Participant, foreignKey: "userId" });
Chat.belongsToMany(User, { through: Participant, foreignKey: "chatId" });

module.exports = {
  User,
  Conversation,
  Message,
  Chat,
  Post,
  Participant
};
