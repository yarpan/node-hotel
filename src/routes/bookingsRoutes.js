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

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags: [Bookings]
 *     summary: Get all bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/', auth, bookingsController.getAll);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     tags: [Bookings]
 *     summary: Get booking by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking details
 */
router.get('/:id', auth, bookingsController.getById);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guest_id
 *               - room_id
 *               - check_in_date
 *               - check_out_date
 *             properties:
 *               guest_id:
 *                 type: integer
 *               room_id:
 *                 type: integer
 *               check_in_date:
 *                 type: string
 *                 format: date
 *               check_out_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', auth, bookingsController.create);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     tags: [Bookings]
 *     summary: Update a booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guest_id:
 *                 type: integer
 *               room_id:
 *                 type: integer
 *               check_in_date:
 *                 type: string
 *                 format: date
 *               check_out_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Booking updated
 */
router.put('/:id', auth, bookingsController.update);

/**
 * @swagger
 * /api/bookings/available-rooms:
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
router.get('/available-rooms', auth, bookingsController.getAvailableRooms);

/**
 * @swagger
 * /api/bookings/revenue:
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
router.get('/revenue', auth, bookingsController.getMonthlyRevenue);

module.exports = router;

