const validateRate = (rate) => {
  if (typeof rate !== 'number') return false;
  if (!Number.isInteger(rate)) return false;
  if (rate < 1 || rate > 5) return false;
  return true;
};

const talkerRate = async (req, res, next) => {
  const { rate } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!validateRate(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = talkerRate;