import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: Bun.env.DATABASE_URL,
  casing: "snake_case",
});
