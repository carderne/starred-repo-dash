import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const NODE_ENV = process.env.NODE_ENV!;
const DATABASE_URL = process.env.DATABASE_URL!;
const ssl = NODE_ENV === "production" ? true : undefined;

const getDb = () => {
  const db = drizzle({
    schema,
    connection: {
      connectionString: DATABASE_URL,
      ssl,
    },
  });
  return db;
};

export const db = getDb();
