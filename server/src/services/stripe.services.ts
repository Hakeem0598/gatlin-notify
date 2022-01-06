import { createPayment } from './payment.services';
import { greetCustomer } from './../utils/greetCustomer';
import { Request } from 'express';
import Stripe from 'stripe';
import { SubscriptionType, UserDocument } from '../models/user.types';
import sendEmail from '../utils/email';
import generateLicense from '../utils/generateLicense';
import { findUser } from './user.services';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2020-08-27' });


const getUserByCustomerId = async (customerId: string) => {
    try {
        const customer = await stripe.customers.retrieve(customerId);
        const email = (customer as Stripe.Customer).email;
        return findUser({'discord.email': email });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

const handleCharge = async (charge: Stripe.Charge) => {
    const amount = charge.amount / 100;
    const status = charge.refunded ? 'refunded' : charge.status;
    const description = charge.description as string;
    const customerId = charge.customer as string;
    const email = charge.billing_details.email as string;
    const date = charge.created * 1000;

    await createPayment({ amount, status, description, email, customerId, date })
}

const handleSubscriptionDeleted = async (deletedSubscription: Stripe.Subscription) => {   
    try {
        const { customer, status } = deletedSubscription;
        const user = await getUserByCustomerId(customer as string);
        if (!user) return;

        user.subscription.status = status;

        user.save();
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    } 
}

const handleSubscriptionUpdated = async (updatedSubscription: Stripe.Subscription) => {    
    try {
        const { id, customer, items, status, current_period_end, cancel_at_period_end } = updatedSubscription;
        if (status !== 'active' && status !== 'past_due' && status !== 'canceled') return;

        const user = await getUserByCustomerId(customer as string);
        if (!user) return;

        if (status === 'active') {
            // Action: User subscription renewed
            // Response: update the subscription expiry
            if (user.subscription.subscriptionType) {
                user.subscription.currentPeriodEnd = new Date(current_period_end * 1000);
                user.subscription.cancelAtPeriodEnd = cancel_at_period_end;

            } else {
                // Action: User subscribed for the first time
                // Response: Add a subscription and license to the user
                // Response: Update user role to customer
                // Response: Email license key to user
                const subscriptionType = items.data[0].price.lookup_key as SubscriptionType;
                const subscription = {
                    subscriptionType,
                    subscriptionId: id,
                    customerId: (customer as string),
                    status,
                    currentPeriodEnd: new Date(current_period_end * 1000),
                    cancelAtPeriodEnd: cancel_at_period_end
                }

                user.subscription = subscription;
                user.role = 'customer'
                await greetCustomer(user);
            }
        
        // Action: Users payment method failed the automatic charge
        // Response: Update the subscription status and expiry
        } else if (status === 'past_due') {
            user.subscription.status = status;
            user.subscription.currentPeriodEnd = new Date(current_period_end * 1000);
        } 

        user.save();
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}


export const getPrices = async () => {
    try {
        const stripePrices = await stripe.prices.list({
            lookup_keys: ['monthly', 'yearly'],
        });

        const prices: { [key: string]: any } = {}
    
        stripePrices.data.forEach(({ lookup_key, unit_amount }) => {
            prices[(lookup_key as string)] = {
                lookupKey: lookup_key,
                price: unit_amount
            }
        });

        return prices;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const createStripeProduct = (name: string, interval: Stripe.PriceCreateParams.Recurring.Interval, interval_count: number, unit_amount: number) => {
    return stripe.prices.create({
        unit_amount,
        currency: 'gbp',
        recurring: { interval, interval_count },
        product_data: { name }
    });
}

export const createCheckoutSession = async (lookupKey: SubscriptionType, user: UserDocument) => {
    try {
        // Fetch the price id associated with the lookup key
        const stripePrices = await stripe.prices.list({
            lookup_keys: [lookupKey],
        });

        const price = stripePrices.data[0].id;

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [{ price, quantity: 1 }],
            customer_email: user.discord.email,
            payment_method_types: ['card'],
            mode: 'subscription',
            success_url: `${(process.env.CLIENT_ORIGIN)}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${(process.env.CLIENT_ORIGIN)}/#pricing`,
        });

        return session.url;
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const createPortalSession = async (customer: string) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${process.env.CLIENT_ORIGIN as string}/dashboard`,
        });
    
        return portalSession;
        
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const webhook = (payload: string | Buffer, signature:  string | Buffer | Array<string>) => {
    let event: Stripe.Event;
    let subscription: Stripe.Subscription;
    let status: Stripe.Subscription.Status;
    let charge: Stripe.Charge;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET_PROD as string);
    } catch (err) {
        const message = `Webhook Error: ${(err as Error).message}`;
        console.log(message);
        return 400;
    }

    const { data, type } = event;

    switch (type) {
        case 'customer.subscription.deleted':
            subscription = data.object as Stripe.Subscription;
            status = subscription.status;

            console.log(`Subscription deleted and the status is ${status}.`);
            handleSubscriptionDeleted(subscription);
            break;
        case 'customer.subscription.updated':
            subscription = data.object as Stripe.Subscription;
            status = subscription.status;
            
            console.log(`Subscription updated and the status is ${status}.`);
            handleSubscriptionUpdated(subscription);
            break;
        case 'charge.failed':
            charge = data.object as Stripe.Charge;
            
            console.log(`Charge failed and the status is ${charge.status}.`);
            handleCharge(charge);
            break;
        case 'charge.refunded':
            charge = data.object as Stripe.Charge;
            
            console.log(`Charge refunded and the status is ${charge.status}.`);
            handleCharge(charge);
            break;
        case 'charge.succeeded':
            charge = data.object as Stripe.Charge;
            
            console.log(`Charge succeeded and the status is ${charge.status}.`);
            handleCharge(charge);
            break;
        default:
            break;
    }
    return 200;
}