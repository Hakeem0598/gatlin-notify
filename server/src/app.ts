
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import db from './db';
import { sessionOptions, corsOptions } from './config';
import apiRouter from './routes';
import AppError from './utils/appError';
import './strategies/discordStrategy';
import { webhookHandler } from './controllers/stripe.controller';

// CONNECT TO DATABASE
db()
.then(() => console.log('DB connection successful...'))
.catch(err => console.log(err));

const app = express();

// STRIPE WEBHOOK - Stripe requires raw request body
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// GLOBAL MIDDLEWARES 
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use('/api', apiRouter);

// UNDEFINED ROUTE MIDDLWARE 
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const { method, baseUrl } = req;
    const message = `Cannot ${method} ${baseUrl}`
    next(new AppError(message, 404));
});

// GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error('Error 💥:', err.message);

    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message || 'An unexpected error has occured'
    })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})