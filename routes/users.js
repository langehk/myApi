const express = require("express");
const router = express.Router();
const User = require("../models/User");


// CRUD API

// Get all the users
router.get("/", async (req, res) => {
    try {
      const users = await User.find(); // Henter alle vores users
      res.json(users);
    } catch (err) {
      res.json({ message: err });
    }
  });
  
  //Submit a user
  router.post("/", async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
    });
    //Gemmer til vores DB.
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  });

  //Get a specific user
  router.get("/:userId", async (req, res) => {
      try{
    const user = await User.findById(req.params.userId);
    res.json(user);
      }
      catch(err){
          res.json({message: err});
      }
  })


  //Delete a user
  router.delete("/:userId", async (req, res) => {
      try{
          const deletedUser = User.remove({
              _id: req.params.userId  //checker om Id er lig med den bruger vi deleter.
          });
          res.json(deletedUser);
      }
      catch(err)
      {
          res.json({message: err});
      }
  })

  //Update user 
  /*
  * Here you can only change your password.
  */
  router.patch("/:userId", async (req, res) => {
    try{
        const updateUser = await User.updateOne({
            _id: req.params.userId
        },
        {$set: {password: req.body.password}
    });
        res.json(updateUser);
    }
    catch(err){
        res.json({message: err});
    }
  });


  module.exports = router;