const watchedDate = (req, res, next) => {
  const { date } = req.query;
  if (date && !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedDate;