const watchedAtInput = (req, res, next) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const { talk } = req.body;
  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const valid = regex.test(talk.watchedAt);
  if (!valid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtInput;