import { redirectToDashboardHandler, logoutHandler } from './../controllers/auth.controller';
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/logout', logoutHandler);
authRouter.get('/discord', passport.authenticate('discord'));
authRouter.get('/discord/callback', passport.authenticate('discord', { failureRedirect: process.env.CLIENT_ORIGIN }), redirectToDashboardHandler);


export default authRouter;
