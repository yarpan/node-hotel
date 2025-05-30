module.exports = (req, res, next) => {
  // Проста перевірка, наприклад токена в заголовках
  const token = req.headers['authorization'];
  if (token === 'Bearer test-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
