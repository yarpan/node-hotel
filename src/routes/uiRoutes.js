const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'MyApp',
    message: 'Hello from the backend!',
    session: req.session,
  });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', session: req.session });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Submitting login form:', username, password);
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      req.session.token = data.accessToken;
      console.log('Login API response:', data);
      res.redirect('/dashboard');
    } else {
      res.status(401).send(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login form handler error:', err);
    res.status(500).send('Server error');
  }
});

function ensureAuth(req, res, next) {
  if (req.session?.token) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', session: req.session });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/bookings', ensureAuth, async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/bookings', {
      headers: {
        Authorization: `Bearer ${req.session.token}`,
      },
    });
    const bookings = await response.json();

    res.render('bookings', {
      title: 'Bookings',
      bookings,
      session: req.session,
    });
  } catch (err) {
    res.status(500).send('Failed to load bookings');
  }
});

router.get('/bookings/new', ensureAuth, (req, res) => {
  res.render('new-booking', { title: 'New Booking', session: req.session });
});

router.post('/bookings/new', ensureAuth, async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).send(data.message || 'Booking failed');
    }

    res.redirect('/bookings');
  } catch (err) {
    res.status(500).send('Failed to create booking');
  }
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', session: req.session });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // після реєстрації автоматично логінимо
      req.session = { token: data.token };
      res.redirect('/dashboard');
    } else {
      res.status(400).send(data.message || 'Registration failed');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/guests', ensureAuth, async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/guests', {
      headers: {
        Authorization: `Bearer ${req.session.token}`,
      },
    });

    const guests = await response.json();
    res.render('guests', { title: 'Guests', guests });
  } catch (err) {
    console.error('Failed to load guests:', err);
    res.status(500).send('Failed to load guests');
  }
});

router.get('/rooms', ensureAuth, async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/rooms', {
      headers: {
        Authorization: `Bearer ${req.session.token}`,
      },
    });

    const rooms = await response.json();
    res.render('rooms', { title: 'Rooms', rooms });
  } catch (err) {
    console.error('Failed to load rooms:', err);
    res.status(500).send('Failed to load rooms');
  }
});


module.exports = router;
