// function emailValid(email) {
//   const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   return regex.test(email);
// }

// function emailInput(req, res, next) {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (!emailValid(email)) {
//     return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   }
//   next();
// }

// module.exports = emailInput;