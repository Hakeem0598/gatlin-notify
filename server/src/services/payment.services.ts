import { Request } from "express";
import { DocumentDefinition } from "mongoose";
import Payment, { PaymentDocument } from "../models/payment.model";
import APIFeatures from "../utils/apiFeatures";
import _ from 'lodash';

export const createPayment = (input: DocumentDefinition<PaymentDocument>) => {
    return Payment.create(input);
}

export const findPayments = async (req: Request) => {
    try {
        const features = await APIFeatures.build(Payment, req.query)
        const { query, pagination } = features.paginate().limitFields();

        const filterPagination =  _.omit(pagination, ['query', 'paginate', 'queryObject', 'resultsFrom', 'resultsTo']);
        return { pagination: filterPagination, payments: await query }
    } catch (error: any) {
        throw new Error(error.message);
    }
}