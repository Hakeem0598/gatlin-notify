import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.isUnauthenticated()) return next(new AppError('Unathorized', 401));
    next();
}

export default requireUser;
