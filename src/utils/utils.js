const fs = require('fs').promises;

const read = async () => {
  const data = await fs.readFile('src/talker.json', 'utf8');
  return JSON.parse(data);
};

module.exports = {
  read,
};