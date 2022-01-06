import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import AppError from '../utils/appError';

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the request object against the schema
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })

        return next();
    } catch (error: any) {
        next(new AppError(error.message, 400));
    }
}

export default validateRequest;