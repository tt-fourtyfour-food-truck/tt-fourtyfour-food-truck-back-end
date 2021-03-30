const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require('./restricted')

router.get("/", restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  module.exports = router;

module.exports = router;