import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseConfig = { connectionString: process.env.DATABASE_URL };

if(process.env.MODE === "PROD") {
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

try {
    await db.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log("Error trying to connect");
  }

export default db; 