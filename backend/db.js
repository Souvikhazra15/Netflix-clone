import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('MONGODB_URI is missing in backend/.env');
}

const client = new MongoClient(uri);
let database;

export const connectDB = async () => {
	if (database) {
		return database;
	}

	await client.connect();
	database = client.db('netflix');

	await Promise.all([
		database.collection('users').createIndex({ email: 1 }, { unique: true }),
		database.collection('auth_events').createIndex({ userId: 1, createdAt: -1 }),
		database.collection('auth_events').createIndex({ email: 1, createdAt: -1 })
	]);

	return database;
};

export const getDB = () => {
	if (!database) {
		throw new Error('Database is not connected. Call connectDB() first.');
	}
	return database;
};
