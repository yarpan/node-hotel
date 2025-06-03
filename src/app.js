const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const guestsRoutes = require('./routes/guestsRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/guests', auth, guestsRoutes);
app.use('/api/rooms', auth, roomsRoutes);
app.use('/api/bookings', auth, bookingsRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
