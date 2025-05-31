const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

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
 *         description: List of all bookings
 *       401:
 *         description: Unauthorized
 */
router.get('/', bookingsController.getAll);

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
 *           example:
 *             guest_id: 1
 *             room_id: 2
 *             check_in_date: "2025-06-01"
 *             check_out_date: "2025-06-05"
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', bookingsController.create);

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
 *         description: Booking found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.get('/:id', bookingsController.getById);

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
 *           example:
 *             guest_id: 1
 *             room_id: 2
 *             check_in_date: "2025-06-02"
 *             check_out_date: "2025-06-06"
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.put('/:id', bookingsController.update);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Bookings]
 *     summary: Delete a booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Booking deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete('/:id', bookingsController.remove);

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
 *         name: check_in_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: check_out_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Available rooms
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized
 */
router.get('/available-rooms', bookingsController.getAvailableRooms);

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
 *           example: "2025-06"
 *     responses:
 *       200:
 *         description: Revenue data
 *       400:
 *         description: Invalid month format
 *       401:
 *         description: Unauthorized
 */
router.get('/revenue', bookingsController.getRevenue);

module.exports = router;