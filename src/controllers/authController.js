const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);
    const tokenEntry = result.rows[0];

    if (!tokenEntry || new Date(tokenEntry.expires_at) < new Date()) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessToken(tokenEntry.user_id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
