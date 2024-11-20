import mongoose from 'mongoose';
import { MONGO_URL, DATABASE_NAME } from '../constants.js';

export const dbConnection = async () => {
	try {
		const dbInstance = await mongoose.connect(
			`${MONGO_URL}/${DATABASE_NAME}`,
		);
		console.log(
			`MongoDB connected !! DB HOST: ${dbInstance.connection.port}`,
		);
	} catch (error) {
		console.log('MONGODB connection FAILED ', error.message);
		process.exit(1);
	}
};
