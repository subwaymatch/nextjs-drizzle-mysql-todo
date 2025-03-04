import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });

  const db = drizzle(connection);

  // This will automatically run needed migrations on the database
  await migrate(db, { migrationsFolder: "drizzle" });

  console.log("Migrations completed");
  await connection.end();
}

runMigration().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
