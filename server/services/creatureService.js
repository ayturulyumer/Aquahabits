const Creature = require("../models/Creature");

exports.getAll = async () => {
  const creatures = await Creature.find().exec();

  if (!creatures) {
    throw new Error("No creatures found");
  }
  return creatures;
};
