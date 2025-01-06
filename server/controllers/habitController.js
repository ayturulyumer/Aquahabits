const router = require("express").Router();
const habitService = require("../services/habitService.js");

const createHabit = async (req, res) => {
  const { userId } = req.user; 
  const habitData = req.body; 

  try {
    const habit = await habitService.createHabit(userId, habitData);
    res.status(201).json({ success: true, habit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = router;
