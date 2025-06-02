const db = require('../../src/config/db');

async function getUserById(id) {
  const user = await db.users.findById(id);
  if (!user) throw new Error('User not found');
  return user;
}

module.exports = { getUserById };
