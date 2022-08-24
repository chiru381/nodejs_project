const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    const newPlan = new userModel(req.body);
    try {
      const savedPlan = await newPlan.save();
      res.status(200).json(savedPlan);
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports =  { createUser }