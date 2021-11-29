const { Op } = require("sequelize");
 const db = require("../db");

 const Participant = db.define("participant", {});

 // find participants for a given chat Id

 Participant.findParticipants = async function (chatId) {
   const participants = await Participant.findAll({
     where: {
       chatId: { chatId }
     }
   });

   // return participants or null if it doesn't exist
   return participants;
 };

 module.exports = Participant;