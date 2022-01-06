import { createCheckoutSession, webhook, createPortalSession } from './../services/stripe.services';
import { UserDocument } from './../models/user.types';
import { Request, Response, NextFunction } from 'express';
import { getPrices } from '../services/stripe.services';
import catchAsync from '../utils/catchAsync';

export const getPricesHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const prices = await getPrices();

    res.status(200).json({
        status: 'success',
        prices
    });
})


export const createCheckoutSessionHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const sessionUrl = await createCheckoutSession(req.body.lookup_key, req.user as UserDocument);
    if (sessionUrl) return res.status(303).redirect(sessionUrl);

    res.redirect(process.env.CLIENT_ORIGIN as string);
})


export const createPortalSessionHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const portalSession = await createPortalSession((req.user as UserDocument).subscription.customerId);
    res.redirect(303, portalSession.url);
})


export const webhookHandler = catchAsync(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    const statusCode = webhook(req.body, signature);
    res.sendStatus(statusCode);
})