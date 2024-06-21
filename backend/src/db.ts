import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error('MONGODB_URI is not defined in environment variables');
		}
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('MongoDB connected...');
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
