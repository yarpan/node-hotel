const express = require('express');
const router = express.Router();
const guestsController = require('../controllers/guestsController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Guests
 *   description: Guest management
 */

/**
 * @swagger
 * /api/guests:
 *   get:
 *     tags: [Guests]
 *     summary: Get all guests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of guests
 */
router.get('/', auth, guestsController.getAll);

/**
 * @swagger
 * /api/guests/{id}:
 *   get:
 *     tags: [Guests]
 *     summary: Get guest by ID
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
 *         description: Guest object
 *       404:
 *         description: Guest not found
 */
router.get('/:id', auth, guestsController.getById);

/**
 * @swagger
 * /api/guests:
 *   post:
 *     tags: [Guests]
 *     summary: Create new guest
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *             properties:
 *               full_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Guest created
 */
router.post('/', auth, guestsController.create);

/**
 * @swagger
 * /api/guests/{id}:
 *   put:
 *     tags: [Guests]
 *     summary: Update guest
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
 *               full_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Guest updated
 *       404:
 *         description: Guest not found
 */
router.put('/:id', auth, guestsController.update);

module.exports = router;
