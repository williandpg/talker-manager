const login = require('express').Router();
const { generateToken } = require('../utils/utils');
const { emailInput, passwordInput } = require('../middlewares/index');

login.post('/login', emailInput, passwordInput, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = login;