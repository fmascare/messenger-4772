const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");
const Post = require("./post");
const Chat = require("./chat");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Post.belongsTo(Chat, { as: "chat" });
Chat.hasMany(Post);
User.belongsToMany(Chat, { through: Participant, foreignKey: "userId" });
Chat.belongsToMany(User, { through: Participant, foreignKey: "chatId" });

module.exports = {
  User,
  Conversation,
  Message,
  Participant,
  Chat,
  Post
};