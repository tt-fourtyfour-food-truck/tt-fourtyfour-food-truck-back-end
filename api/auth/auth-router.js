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

  router.post('/login', validateRequest, checkUsernameExists, async (req, res) => {

  const { username, password } = req.body;
  const [User] = await Users.findBy({username:username})

  if (User && bcryptjs.compareSync(password, User.password)) {
    const token = buildToken(User);
      res.status(200).json({
        message: `welcome, ${User.username}`,
        token: token
    })
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const config = {
    expiresIn: '1d',
  }
  return jwt.sign(
    payload, JWT_SECRET, config
  )
}

module.exports = router;