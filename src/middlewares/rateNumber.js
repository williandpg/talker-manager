const validate = (rate) => {
  const numericRate = parseInt(rate, 10);
  return !Number.isNaN(numericRate) && numericRate 
  >= 1 && numericRate <= 5 && numericRate === parseFloat(rate);
};

const rateNumber = (req, res, next) => {
  const { rate } = req.query;
  if (rate !== undefined && !validate(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = rateNumber;