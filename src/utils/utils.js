const fs = require('fs').promises;
const crypto = require('crypto');
const { join } = require('path');

const read = async () => {
  const data = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(data);
};

const generateToken = () => {
  const token = () => crypto.randomBytes(8).toString('hex');
  return token();
};

const write = async (talker) => {
  const data = await read();
  const path = '../talker.json';
  await fs.writeFile(join(__dirname, path), JSON.stringify([...data, talker]));
};

module.exports = {
  read,
  generateToken,
  write,
};