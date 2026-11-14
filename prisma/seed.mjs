import { readFile } from "node:fs/promises";
import { Client } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to run the database seed.");
}

const client = new Client({ connectionString: databaseUrl });

try {
  const seedSql = await readFile(new URL("./seed.sql", import.meta.url), "utf8");

  await client.connect();
  await client.query("BEGIN");
  await client.query(seedSql);
  await client.query("COMMIT");

  console.info("PostgreSQL seed data has been applied.");
} finally {
  await client.end();
}
