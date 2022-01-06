import mongoose from 'mongoose';

export default () => mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/gatlin');
