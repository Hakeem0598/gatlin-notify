import { Request, Response, NextFunction } from 'express';

export const redirectToDashboardHandler = (req: Request, res: Response, next: NextFunction) => {
    res.redirect(`${process.env.CLIENT_ORIGIN}/dashboard`);
}

export const logoutHandler = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
        if (err) return res.redirect(`${process.env.CLIENT_ORIGIN}`);

        res.clearCookie('sid')
        res.redirect(`${process.env.CLIENT_ORIGIN}`);
    })
}