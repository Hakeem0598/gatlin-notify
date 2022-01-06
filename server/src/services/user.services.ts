import { Request } from 'express';
import _ from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import APIFeatures from '../utils/apiFeatures';
import User from './../models/user.model';
import { UserDocument } from './../models/user.types';
import { greetCustomer } from './../utils/greetCustomer';

export const findUserAndUpdate = (filter: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options?: QueryOptions) => {
    // Whitelist the fields that can updated
    const newObj = {} as UserDocument;
    const allowedFields = ['discord', 'subscription'];

    (Object.keys(update) as (keyof UserDocument)[]).forEach(value => {
        if (allowedFields.includes(value)) (newObj[value] as any) = update[value]
    });

    return User.findOneAndUpdate(filter, newObj, options)
};

export const findUserById = (id: string, projection?: any, options?: QueryOptions) => {
    return User.findById(id, projection, options)
};

export const findUser = (filter: FilterQuery<UserDocument>, projection?: any, options?: QueryOptions) => {
    return User.findOne(filter, projection, options);
}

export const findUsers = async (req: Request) => {
    try {
        const features = await APIFeatures.build(User, req.query)
        const { query, pagination } = features.paginate().limitFields();

        const filterPagination =  _.omit(pagination, ['query', 'paginate', 'queryObject', 'resultsFrom', 'resultsTo']);
        return { pagination: filterPagination, users: await query }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const findUsersCount = (filter: FilterQuery<UserDocument>) => {
    return User.countDocuments(filter)
};

export const createLifetimeUser = async (email: string) => {
    try {
        const user = await findUser({ 'discord.email': email });

        if (!user) throw new Error('User does not exist');

        user.role = 'lifetime';
        await greetCustomer(user);
        
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
