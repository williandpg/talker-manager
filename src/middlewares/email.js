const emailInput = (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const valid = regex.test(email);
  if (!valid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = emailInput;