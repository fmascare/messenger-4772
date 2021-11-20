const Sequelize = require("sequelize");
const { Participant } = require(".");
const db = require("../db");
//const Message = require("./message");

const Conversation = db.define("conversation", {
  chatName: {
    type: Sequelize.STRING,
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    include: [
      { 
        model: Participant,
        where: {
          userId: {
            [Op.and]: [user1Id, user2Id]
          }
        }
      }
    ],
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
