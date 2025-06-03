const { Pool } = require('pg');
const dotenv = require('dotenv-flow');

dotenv.config(); // automaticaly select .env або .env.test, depending on NODE_ENV

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};