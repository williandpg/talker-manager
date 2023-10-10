const fs = require('fs').promises;
const crypto = require('crypto');

const read = async () => {
  const data = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(data);
};

const generateToken = () => {
  const token = () => crypto.randomBytes(8).toString('hex');
  return token();
};

module.exports = {
  read,
  generateToken,
};