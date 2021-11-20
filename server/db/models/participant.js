const { Op } = require("sequelize");
const db = require("../db");

const Participant = db.define("participant", {});

// find participants for a given conversation Id

Participant.findParticipants = async function (conversationId) {
  const participants = await Participant.findAll({
    where: {
      conversationId: { conversationId }
    }
  });

  // return participants or null if it doesn't exist
  return participants;
};

module.exports = Participant;
