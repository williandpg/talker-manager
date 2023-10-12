const login = require('express').Router();
const { emailInput, passwordInput } = require('../middlewares');
const { generateToken } = require('../utils/utils');

login.post('/login', emailInput, passwordInput, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = login;