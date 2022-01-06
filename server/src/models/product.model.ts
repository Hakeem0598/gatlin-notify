import mongoose from 'mongoose';

export type ProductDocument = mongoose.Document & {
    name: string;
    productId: string;
    priceId: string;
    price: number;
    active: boolean;
    // createdAt: Date;
    // updatedAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        name: String,
        productId: String,
        priceId: String,
        price: Number,
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
