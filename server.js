const express = require('express');
const dotenv = require('dotenv');
const guestsRoutes = require('./routes/guestsRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/guests', guestsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
