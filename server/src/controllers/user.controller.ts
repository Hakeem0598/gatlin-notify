import { createLifetimeUser } from './../services/user.services';
import { Request, Response, NextFunction } from "express"
import { findUsers, findUsersCount } from "../services/user.services"
import catchAsync from "../utils/catchAsync"

export const getMeHandler = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        user: req.user
    })
};

export const getUsersHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { users, pagination } = await findUsers(req);


    res.status(200).json({
        status: 'success',
        pagination,
        users
    });
})


export const getAnalyticsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Total active memebers
    const totalMembers = await findUsersCount({ 'subscription.status': 'active' });

    // Upcoming cancellations
    const upcomingCancellations = await findUsersCount({ 'subscription.cancelAtPeriodEnd': true });

    // Monthly recurring revenue
    const monthlyUsersRecurringRevenue = (await findUsersCount({ 
        'subscription.status': 'active',
        'subscription.cancelAtPeriodEnd': false,
        'subscription.subscriptionType': 'monthly'
    })) * 30; 

    const yearlyUsersRecurringRevenue = (await findUsersCount({
        'subscription.status': 'active',
        'subscription.cancelAtPeriodEnd': false,
        'subscription.subscriptionType': 'yearly'
    })) * (300 / 12); 

    const monthlyRecurringRevenue = monthlyUsersRecurringRevenue + yearlyUsersRecurringRevenue;

    const analytics = [
        {
            title: 'Members',
            value: totalMembers,
            url: '/admin/licenses'
        },
        {
            title: 'Upcoming cancellations',
            value: upcomingCancellations,
            url: '/admin/cancellations'
        },
        {
            title: 'Monthly revenue',
            value: `£${monthlyRecurringRevenue}`,
            url: '/admin/stripe'
        }
    ]

    res.status(200).json({
        status: 'success',
        analytics
    })
})


export const createLifetimeUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await createLifetimeUser(email);

    res.status(200).json({
        status: 'success',
        user
    })
})