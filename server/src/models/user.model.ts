import mongoose from 'mongoose';
import { UserDocument } from './user.types';

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['user', 'customer', 'admin', 'lifetime'],
            default: 'user'
        },
        discord: {
            id: String,
            avatarURL: String,
            username: String,
            discriminator: String,
            email: String,
            fetchedAt: String
        },
        subscription: {
            subscriptionType: {
                type: String,
                enum: ['monthly', 'yearly']
            },
            subscriptionId: String,
            customerId: String,
            status: {
                type: String,
                enum: ['active', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'all', 'ended']
            },
            currentPeriodEnd: Date,
            cancelAtPeriodEnd: Boolean
        },
        license: {
            key: String,
            activated: Boolean,
            activatedBy: String
        }
    }, 
    { 
        timestamps: true 
    }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;