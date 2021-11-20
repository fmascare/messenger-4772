const router = require("express").Router();
const { User, Conversation, Message, Participant } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      attributes: ["id", "chatName"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: Participant,
          where: { userId: userId },
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      const otherUsers = await Participant.findAll({
        where: { 
          conversationId: convoJSON.id,
          userId: {
            [Op.not]: userId,
          },
        },
        attributes: ["userId"],
        include: [
          {
            model: User, 
            as: "user",
            where: {
              id: {
                [Op.not]: userId,
              }
            },
            attributes: ["id", "username", "photoUrl"],
            required: false,
          },
        ],
      });
      
      for(let i=0; i<otherUsers.length; i++) {
        const otherUserJSON = otherUsers[i].toJSON();
        // set property for online status of the other user
        if (onlineUsers.includes(otherUserJSON.user.id)) {
          otherUserJSON.user.online = true;
        } else {
          otherUserJSON.user.online = false;
        }
        otherUsers[i] = otherUserJSON.user;
      }
      convoJSON.otherUser = otherUsers;

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
