function passwordInput(req, res, next) {
  const { password } = req.body;
  if (!password || password === null) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = passwordInput;