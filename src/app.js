const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const guestsRoutes = require('./routes/guestsRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/auth');
const uiRoutes = require('./routes/uiRoutes');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/', uiRoutes);

// Protected routes
app.use('/api/guests', auth, guestsRoutes);
app.use('/api/rooms', auth, roomsRoutes);
app.use('/api/bookings', auth, bookingsRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
