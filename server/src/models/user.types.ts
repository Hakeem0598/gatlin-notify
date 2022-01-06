import mongoose from 'mongoose';
import Stripe from 'stripe'

export type License = {
    key: string;
    activated: boolean;
    activatedBy: string;
}

export type Role = 'user' | 'admin' | 'customer' | 'lifetime';

export type SubscriptionType = 'monthly' | 'yearly';

export type Subscription = {
    subscriptionType: SubscriptionType;
    subscriptionId: string;
    customerId: string;
    status: Stripe.Subscription.Status;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
}

export type Discord = {
    id: string;
    avatarURL: string;
    username: string;
    discriminator: string;
    email: string;
    fetchedAt: string;
}

export type UserDocument = mongoose.Document & {
    role: Role;
    discord: Discord;
    createdAt: Date;
    updatedAt: Date;
    subscription: Subscription;
    license: License;
}