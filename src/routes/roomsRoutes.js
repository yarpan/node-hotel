const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: Get all rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 */
router.get('/', auth, roomsController.getAll);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     tags: [Rooms]
 *     summary: Get room by ID
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
 *         description: Room object
 *       404:
 *         description: Room not found
 */
router.get('/:id', auth, roomsController.getById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     tags: [Rooms]
 *     summary: Create new room
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room_number
 *               - price
 *             properties:
 *               room_number:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Room created
 */
router.post('/', auth, roomsController.create);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     tags: [Rooms]
 *     summary: Update room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Room updated
 *       404:
 *         description: Room not found
 */
router.put('/:id', auth, roomsController.update);

module.exports = router;
