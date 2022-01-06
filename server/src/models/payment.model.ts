import mongoose from 'mongoose';

export type PaymentDocument = mongoose.Document & {
    amount: number,
    status: string,
    description: string,
    email: string,
    customerId: string,
    date: number
}

const paymentSchema = new mongoose.Schema({
    amount: Number,
    status: String,
    description: String,
    email: String,
    customerId: String,
    date: Number
})

const Payment = mongoose.model<PaymentDocument>('Payment', paymentSchema);

export default Payment;