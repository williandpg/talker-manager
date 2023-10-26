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
  searchTerm,
  rateNumber,
  watchedDate,
  talkerRate,
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
  try {
    const data = await read();
    if (!data) return res.status(HTTP_OK_STATUS).json([]);
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
});

app.get('/talker/search', tokenInput, searchTerm, rateNumber, watchedDate, async (req, res) => {
  try {
    const { q, rate, date } = req.query;
    let filteredTalkers = await read();
    if (q) {
      filteredTalkers = filteredTalkers.filter((tlk) => 
        tlk.name.toLowerCase().includes(q.toLowerCase()));
    }
    if (rate !== undefined) {
      const numericRate = parseInt(rate, 10);
      filteredTalkers = filteredTalkers.filter((tlk) => tlk.talk.rate === numericRate);
    }
    if (date) {
      filteredTalkers = filteredTalkers.filter((tlk) => tlk.talk.watchedAt === date);
    }
    res.status(HTTP_OK_STATUS).json(filteredTalkers);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await read();
    const talkerFind = data.find((tlk) => tlk.id === Number(id));
    if (!talkerFind) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({ 
        message: 'Pessoa palestrante não encontrada' }); 
    }
    return res.status(HTTP_OK_STATUS).json(talkerFind);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
});

app.post('/login', emailInput, passwordInput, (req, res) => {
  try {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
});

app.post('/talker', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    try {
      const data = await read();
      const newTalker = { ...req.body, id: data.length + 1 };
      write([...data, newTalker]);
      res.status(HTTP_CREATED_STATUS).json(newTalker);
    } catch (error) {
      console.error(`Erro ao ler o arquivo: ${error}`);
    }
  });

app.put('/talker/:id', tokenInput, nameInput, ageInput, talkInput, rateInput, watchedAtInput,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = await read();
      const talkerFind = data.find((tlk) => tlk.id === Number(id));
      if (!talkerFind) {
        return res.status(HTTP_NOT_FOUND_STATUS).json({ 
          message: 'Pessoa palestrante não encontrada' }); 
      }
      const talkerUpdate = { ...req.body, id: talkerFind.id };
      const talkerFilter = data.filter((tlk) => tlk.id === Number(id));
      write([...talkerFilter, talkerUpdate]);
      return res.status(HTTP_OK_STATUS).json(talkerUpdate);
    } catch (error) {
      console.error(`Erro ao ler o arquivo: ${error}`);
    }
  });

app.delete('/talker/:id', tokenInput, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
});

app.patch('/talker/rate/:id', tokenInput, talkerRate, async (req, res) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    const data = await read();
    const talkerFind = data.find((tlk) => tlk.id === Number(id));
    if (!talkerFind) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({ 
        message: 'Pessoa palestrante não encontrada' });
    }
    const updatedTalker = { ...talkerFind, talk: { ...talkerFind.talk, rate: Number(rate) } };
    const updatedData = data.map((tlk) => (tlk.id === Number(id) ? updatedTalker : tlk));
    await write(updatedData);
    res.status(HTTP_NO_CONTENT_STATUS).send();
  } catch (error) {
    console.error(`Erro ao ler/escrever o arquivo: ${error}`);
    res.status(400).send({ message: 'Erro no servidor' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
