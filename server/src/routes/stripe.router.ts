import { getPricesHandler, createCheckoutSessionHandler, createPortalSessionHandler } from './../controllers/stripe.controller';
import express from 'express';
import { requireUser } from '../middleware';
import restrictTo from '../middleware/restrictTo';

const stripeRouter = express.Router();

stripeRouter.get('/prices', getPricesHandler);
stripeRouter.post('/create-checkout-session', requireUser, createCheckoutSessionHandler);
stripeRouter.post('/create-portal-session', requireUser, restrictTo(['customer']), createPortalSessionHandler);

export default stripeRouter;