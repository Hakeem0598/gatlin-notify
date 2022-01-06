import { Request, Response, NextFunction } from 'express';
import { createProduct, findProducts } from '../services/product.services';
import { createStripeProduct } from '../services/stripe.services';
import catchAsync from "../utils/catchAsync";

export const getProductsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { products, pagination } = await findProducts(req);

    res.status(200).json({
        status: 'success',
        pagination,
        products
    });
})


export const createProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, interval, interval_count, unit_amount } = req.body;

    const { id, active, product } = await createStripeProduct(name, interval, interval_count, unit_amount * 100);

    const newProduct = await createProduct({
        name: name as string,
        productId: product as string,
        priceId: id,
        price: unit_amount,
        active
    });

    res.status(200).json({
        status: 'success',
        product: newProduct
    });
})