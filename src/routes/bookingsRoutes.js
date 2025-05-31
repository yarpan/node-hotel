const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Room bookings
 */

router.get('/', auth, bookingsController.getAll);

router.get('/:id', auth, bookingsController.getById);

router.post('/', auth, bookingsController.create);

router.put('/:id', auth, bookingsController.update);

/**
 * @swagger
 * /api/available-rooms:
 *   get:
 *     tags: [Bookings]
 *     summary: Get available rooms by date
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of available rooms
 */
router.get('/../available-rooms', auth, bookingsController.getAvailableRooms);

/**
 * @swagger
 * /api/revenue:
 *   get:
 *     tags: [Bookings]
 *     summary: Get total revenue by month
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-04
 *     responses:
 *       200:
 *         description: Total revenue
 */
router.get('/../revenue', auth, bookingsController.getMonthlyRevenue);

module.exports = router;
