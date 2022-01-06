import express from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';
import stripeRouter from './stripe.router';
import productRouter from './product.router';
import paymentRouter from './payment.router';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/stripe', stripeRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/payments', paymentRouter);


export default apiRouter;