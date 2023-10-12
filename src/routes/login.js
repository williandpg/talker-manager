const login = require('express').Router();
const { emailInput, passwordInput } = require('../middlewares/index');
const { generateToken } = require('../utils/utils');

login.post('/login', emailInput, passwordInput, async (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = login;