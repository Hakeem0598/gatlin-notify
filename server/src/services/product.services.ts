import { Request } from 'express';
import _ from 'lodash';
import { DocumentDefinition } from 'mongoose';
import Product, { ProductDocument } from '../models/product.model';
import APIFeatures from '../utils/apiFeatures';

export const createProduct = (input: DocumentDefinition<ProductDocument>) => {
    return Product.create(input);
}

export const findProducts = async (req: Request) => {
    try {
        const features = await APIFeatures.build(Product, req.query)
        const { query, pagination } = features.paginate().limitFields();

        const filterPagination =  _.omit(pagination, ['query', 'paginate', 'queryObject', 'resultsFrom', 'resultsTo']);
        return { pagination: filterPagination, products: await query }
    } catch (error: any) {
        throw new Error(error.message);
    }
}


