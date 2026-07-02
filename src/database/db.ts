import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env before running migrations.");
}

export const db = new Pool({
    connectionString: databaseUrl,
});

db.connect((err) => {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to database");
    }
});