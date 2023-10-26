const searchTerm = (req, res, next) => {
  const { q } = req.query;
  if (q && typeof q !== 'string') {
    return res.status(400).json({ message: 'O parâmetro "q" deve ser uma string' });
  }
  next();
};

module.exports = searchTerm;