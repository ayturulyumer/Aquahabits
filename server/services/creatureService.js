const Creature = require("../models/Creature");

exports.getAll = async () => {
  const creatures = await Creature.find().sort({ cost: 1 }).exec();

  if (!creatures) {
    throw new Error("No creatures found");
  }
  return creatures;
};
