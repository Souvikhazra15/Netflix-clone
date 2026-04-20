import { MongoClient } from 'mongodb';
import dns from 'node:dns';
import tls from 'node:tls';
import dotenv from 'dotenv';

dotenv.config();

// Some ISPs/local DNS resolvers block SRV lookups used by mongodb+srv.
// Force known public resolvers for this Node process.

dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('MONGODB_URI is missing in backend/.env');
}

const baseOptions = {
	serverSelectionTimeoutMS: 10000,
	connectTimeoutMS: 10000,
	retryWrites: true,
	tls: true,
	secureContext: tls.createSecureContext({
		minVersion: 'TLSv1.2',
		maxVersion: 'TLSv1.2'
	}),
	family: 4
};

const client = new MongoClient(uri, baseOptions);
let database;

export const connectDB = async () => {
	if (database) {
		return database;
	}

	try {
		await client.connect();
	} catch (error) {
		// In some local networks/antivirus proxies, Atlas TLS handshake may fail.
		// Try a last-resort insecure TLS fallback for local development only.
		if (error?.message?.toLowerCase().includes('tls') || error?.message?.toLowerCase().includes('ssl')) {
			const fallbackClient = new MongoClient(uri, {
				...baseOptions,
				tlsAllowInvalidCertificates: true,
				tlsAllowInvalidHostnames: true
			});

			await fallbackClient.connect();
			database = fallbackClient.db('netflix');
		} else {
			throw error;
		}
	}

	if (!database) {
		database = client.db('netflix');
	}

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
