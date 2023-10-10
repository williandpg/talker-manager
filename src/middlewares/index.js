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
  
// function passwordInput(req, res, next) {
//   const { password } = req.body;
//   if (!password) {
//     return res.status(400).json({ message: 'O campo "password" é obrigatório' });
//   }
//   if (password.length < 6) {
//     return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
//   }
//   next();
// }

// module.exports = {
//   emailInput,
//   passwordInput,
// };