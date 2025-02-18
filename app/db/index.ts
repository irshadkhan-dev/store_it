import "dotenv/config";
import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";
import { filesTable } from "./schema";

const DATABASE_URL = process.env.SINGLESTORE_DATABASE_URL!;

const pool = mysql.createPool(DATABASE_URL);
const db = drizzle({ client: pool, schema: { filesTable } });

export default db;
