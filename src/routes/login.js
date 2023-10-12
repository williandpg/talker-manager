const login = require('express').Router();
const { loginValidation } = require('../middlewares/index');
const { generateToken } = require('../utils/utils');

login.post('/login', loginValidation, async (_req, res) => {
  const token = generateToken();
  if (!token) {
    return res.status(401).json({ message: 'Todos os campos devem ser preenchidos' });
  }
  return res.status(200).json({ token });
});

module.exports = login;