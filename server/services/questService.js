const Quest = require("../models/Quest.js");

exports.getAll = async () => {
  const quests = await Quest.find({});

  if (!quests) {
    throw new Error("No quests found");
  }

  return quests;
};
