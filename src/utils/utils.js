const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const DATA_PATH = '../talker.json';

const read = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, DATA_PATH), 'utf-8');
    const talker = JSON.parse(data);
    return talker;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
};

const generateToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const write = async (talker) => {
  try {
    const data = await fs.writeFile(path.resolve(__dirname, DATA_PATH), JSON.stringify(talker));
    return data;
  } catch (error) {
    console.error(`Erro ao escrever no arquivo: ${error}`);
  }
};

module.exports = {
  read,
  generateToken,
  write,
};