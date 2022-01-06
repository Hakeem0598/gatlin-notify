import { Role, UserDocument } from './../models/user.types';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

const restrictTo = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req.user as UserDocument).role)) {
        return next(new AppError('You do not have permission to perfom this action.', 403))
    }
    next()
}

export default restrictTo;