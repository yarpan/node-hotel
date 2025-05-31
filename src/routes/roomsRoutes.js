const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

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
 *         description: List of all rooms
 *       401:
 *         description: Unauthorized
 */
router.get('/', roomsController.getAll);

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
 *               - number
 *               - type
 *               - price
 *             properties:
 *               number:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *           example:
 *             number: "101"
 *             type: "Deluxe"
 *             price: 120.5
 *     responses:
 *       201:
 *         description: Room created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', roomsController.create);

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
 *         description: Room found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.get('/:id', roomsController.getById);

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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *           example:
 *             number: "101"
 *             type: "Suite"
 *             price: 150.0
 *     responses:
 *       200:
 *         description: Room updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.put('/:id', roomsController.update);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     tags: [Rooms]
 *     summary: Delete a room
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
 *         description: Room deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.delete('/:id', roomsController.remove);

module.exports = router;