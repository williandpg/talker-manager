const talker = require('express').Router();
const { read, write } = require('../utils/utils');

const { tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput, 
} = require('../middlewares/index');

talker.get('/talker', async (req, res) => {
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

talker.post('/talker', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const { name, age, talk, rate } = req.body;
    const data = await read();
    const newTalker = { id: data.length + 1, name, age, talk, rate };
    data.push(newTalker);
    await write(data);
    return res.status(201).json(newTalker);
  });

talker.put('/talker/:id', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk, rate } = req.body;
    const data = await read();
    const talkerFind = data.find((tlk) => tlk.id === Number(id));
    if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    const talkerUpdate = { id: Number(id), name, age, talk, rate };
    await write(data);
    return res.status(200).json(talkerUpdate);
  });

talker.delete('/talker/:id', tokenInput, async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.find((tlk) => tlk.id === Number(id));
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  const newData = data.filter((tlk) => tlk.id !== Number(id));
  await write(newData);
  return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = talker;