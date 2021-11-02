const router = require("express").Router();
const { LastChecked } = require("../../db/models");
const { Op } = require("sequelize");

// expects {conversationId, userId}
router.post("/", async (req, res, next) => {
  try {
    if (!req.body.conversationId || !req.body.id) {
      return res.sendStatus(401);
    }
    const user = req.body.id;
    const conversationId = req.body.conversationId;

    let lastcheckinJSON = await LastChecked.findOne({
        where: {
        [Op.and]: {
            userId: user,
            conversationId: conversationId,
            }
        },
        attributes: ["id"],
    });

    //For new convo, add two new rows else update existing row
    if(lastcheckinJSON == null) {
        const sender = req.body.sender;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        await LastChecked.create({
            conversationId: conversationId,
            userId: sender,
            lastChecked: yesterday,
        });
        await LastChecked.create({
            conversationId: conversationId,
            userId: user,
            lastChecked: today,
        });
    }
    else {
        await LastChecked.update(
            { lastChecked: new Date() },
            { where: { id: lastcheckinJSON.id} },
        );
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
