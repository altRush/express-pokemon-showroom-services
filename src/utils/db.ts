import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_DATABASE
});

(async () => {
	await client.connect();
})();

export default client;
