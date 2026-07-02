import fs from "fs/promises";
import path from "path";
import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env before running migrations.");
}

const pool = new Pool({
    connectionString: databaseUrl,
});

const runMigrate = async () => {
    const client = await pool.connect();

    const schemaFile = path.join(process.cwd(), "src", "database", "schema.sql");
    const sql = await fs.readFile(schemaFile, "utf8");

    try {
        await client.query(sql);
        console.log("migration completed");
    } catch (err) {
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

runMigrate();