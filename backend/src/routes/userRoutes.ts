import express from 'express';
import { UserController } from '../controllers/userController';

import { isAuthenticated } from '../middlewares/userAuthentication';
import { table } from 'console';
// import passport, { authenticate } from 'passport';
// import { subWeeks } from 'date-fns';
import { AuthController } from '../controllers/authController';
import '../config/passport';
// import {generalLimiter, LOGIN_API_RATE_LIMIT_RULE} from '../middlewares/rateLimiter';
import { redisClient } from '../config/redis';

const router = express.Router();

/**
 *
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: >-
 *           Bearer token for authentication.
 *           Example: Bearer eyJhbGciOiJIUzI1Ni...
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:id', UserController.getUserById);

/**
 *  @swagger
 * /api/user/userTestRoute:
 *   get:
 *     summary: Test route for users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Test route response
 */
router.get(
  '/userTestRoute',
  // redisClient?.isReady ? generalLimiter(redisClient, LOGIN_API_RATE_LIMIT_RULE) : (req, res, next) => { console.log(`Redis client is not ready or undefined`); next(); },
  (req, res, next) => {
    console.log('Inside userTestRoute');
    next();
  }
);

export default router;
