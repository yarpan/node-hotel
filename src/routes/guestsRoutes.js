const express = require('express');
const router = express.Router();
const guestsController = require('../controllers/guestsController');

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
 *         description: List of all guests
 *       401:
 *         description: Unauthorized
 */
router.get('/', guestsController.getAll);

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
 *               - email
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *             full_name: Vasyl Kisyl
 *             email: vasylkisyl@i.ua
 *     responses:
 *       201:
 *         description: Guest created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', guestsController.create);

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
 *         description: Guest found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Guest not found
 */
router.get('/:id', guestsController.getById);

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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *             full_name: Vasyl Kisyl
 *             email: vasylkisyl@i.ua
 *     responses:
 *       200:
 *         description: Guest updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Guest not found
 */
router.put('/:id', guestsController.update);

/**
 * @swagger
 * /api/guests/{id}:
 *   delete:
 *     tags: [Guests]
 *     summary: Delete a guest
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
 *         description: Guest deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Guest not found
 */
router.delete('/:id', guestsController.remove);

module.exports = router;