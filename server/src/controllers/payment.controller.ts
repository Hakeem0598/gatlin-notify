import { NextFunction, Request, Response } from "express";
import { findPayments } from "../services/payment.services";
import catchAsync from "../utils/catchAsync";

export const getPaymentsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { payments, pagination } = await findPayments(req);

    res.status(200).json({
        status: 'success',
        pagination,
        payments
    });
})