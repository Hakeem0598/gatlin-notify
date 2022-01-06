import { createProductSchema } from './../schema/product.schema';
import express from 'express';
import { createProductHandler, getProductsHandler } from '../controllers/product.controller';
import { validateRequest } from '../middleware';
import restrictTo from '../middleware/restrictTo';

const productRouter = express.Router();

// Add restrictTo
productRouter.route('/').get(getProductsHandler).post(validateRequest(createProductSchema), createProductHandler);

export default productRouter;

