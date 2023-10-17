const express = require('express');
const { read, generateToken, write } = require('./utils/utils');
const { 
  emailInput,
  passwordInput,
  tokenInput,
  nameInput,
  ageInput,
  talkInput,
  rateInput,
  watchedAtInput,
} = require('./middlewares/index');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await read();
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.find((tlk) => tlk.id === Number(id));
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerFind);
});

app.post('/login', emailInput, passwordInput, (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
});

app.post('/talker', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const data = await read();
    const newTalker = { ...req.body, id: data.length + 1 };
    write([...data, newTalker]);
    return res.status(201).json(newTalker);
  });

app.put('/talker/:id', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const { id } = req.params;
    const data = await read();
    const talkerFind = data.filter((tlk) => tlk.id === Number(id));
    if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    const talkerUpdate = { ...req.body, id: talkerFind.id };
    write([...talkerFind, data]);
    return res.status(200).json(talkerUpdate);
  });

app.delete('/talker/:id', tokenInput, async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.some((tlk) => tlk.id === Number(id));
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  const newData = data.filter((tlk) => tlk.id !== Number(id));
  write(newData);
  return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});