const login = require('express').Router();
const { generateToken } = require('../utils/utils');

login.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.status(401).json({ message: 'Todos os campos devem ser preenchidos' });
  }
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = login;