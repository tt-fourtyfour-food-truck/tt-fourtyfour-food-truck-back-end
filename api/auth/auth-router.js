const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { checkUsernameAlreadyExists, validateRequest, checkUsernameExists } = require('./auth-middleware')

const {JWT_SECRET } = require('../../config/secrets')

const Users = require('../users/users-model');

router.post('/register',checkUsernameAlreadyExists,validateRequest, (req, res, next) => {

    const credentials = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
  
    Users.add(credentials)
      .then(user => {
        res.status(201).json(user);
      }).catch(error => {
        res.status(500).json({ message: error.message });
      })
  });

module.exports = router;