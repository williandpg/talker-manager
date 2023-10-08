const talker = require('express').Router();
const { read } = require('../utils/utils');

talker.get('/talker', async (_req, res) => {
  const data = await read();
  return res.status(200).json(data);
});

talker.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.find((talk) => talk.id === Number(id));
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerFind);
});

module.exports = talker;