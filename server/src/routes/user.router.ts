import { createLifetimeUserSchema } from './../schema/user.schema';
import { createLifetimeUserHandler } from './../controllers/user.controller';
import express from 'express';
import { getAnalyticsHandler, getMeHandler, getUsersHandler } from '../controllers/user.controller';
import { requireUser, validateRequest } from '../middleware';
import restrictTo from '../middleware/restrictTo';

const userRouter = express.Router();

userRouter.get('/me', requireUser, getMeHandler);

// Add restrictTo
userRouter.get('/', getUsersHandler);
userRouter.get('/analytics', getAnalyticsHandler);
userRouter.post('/lifetime', validateRequest(createLifetimeUserSchema), createLifetimeUserHandler);

export default userRouter;