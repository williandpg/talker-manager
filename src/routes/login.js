const login = require('express').Router();
const { emailInput, passwordInput } = require('../middlewares/index');
const { generateToken } = require('../utils/utils');

login.post(
  '/login',
  emailInput,
  passwordInput,
  (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'Todos os campos devem ser preenchidos' });
    }
    const token = generateToken();
    res.status(200).json({ token });
  },
);

module.exports = login;