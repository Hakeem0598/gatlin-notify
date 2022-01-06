import express from 'express';
import { getPaymentsHandler } from '../controllers/payment.controller';
import restrictTo from '../middleware/restrictTo';

const paymentRouter = express.Router();

// Add restrictTo
paymentRouter.route('/').get(getPaymentsHandler);

export default paymentRouter;

