const talker = require('express').Router();
const { read } = require('../utils/utils');

talker.get('/talker', async (_req, res) => {
  const data = await read();
  res.status(200).json(data);
});

module.exports = talker;