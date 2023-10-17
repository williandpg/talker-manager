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
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await read();
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.find((tlk) => tlk.id === Number(id));
  if (!talkerFind) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(HTTP_OK_STATUS).json(talkerFind);
});

app.post('/login', emailInput, passwordInput, (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    res.status(HTTP_OK_STATUS).json({ token });
  }
});

app.post('/talker', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const data = await read();
    const newTalker = { ...req.body, id: data.length + 1 };
    write([...data, newTalker]);
    res.status(HTTP_CREATED_STATUS).json(newTalker);
  });

app.put('/talker/:id', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    const { id } = req.params;
    const data = await read();
    const talkerFind = data.filter((tlk) => tlk.id === Number(id));
    if (!talkerFind) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({ 
        message: 'Pessoa palestrante não encontrada' }); 
    }
    const talkerUpdate = { ...req.body, id: talkerFind.id };
    write([...talkerFind, data]);
    res.status(HTTP_OK_STATUS).json(talkerUpdate);
  });

app.delete('/talker/:id', tokenInput, async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerFind = data.some((tlk) => tlk.id === Number(id));
  if (!talkerFind) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      message: 'Pessoa palestrante não encontrada' }); 
  }
  const newData = data.filter((tlk) => tlk.id !== Number(id));
  write(newData);
  res.status(HTTP_NO_CONTENT_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});