import { Request, Response, NextFunction } from 'express';

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => any;

const catchAsync = (fn: HandlerFunction) => (
    (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
)

export default catchAsync;