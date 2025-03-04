import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Create the connection
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

// Create the Drizzle ORM instance
export const db = drizzle(connection, { schema, mode: "default" });
