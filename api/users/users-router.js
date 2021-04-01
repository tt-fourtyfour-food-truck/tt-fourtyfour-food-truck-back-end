const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require('./restricted')

router.get("/", (req, res) => { // add back restricted
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router;