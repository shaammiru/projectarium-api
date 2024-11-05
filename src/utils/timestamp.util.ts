import { timestamp } from "drizzle-orm/pg-core";

export const timestampModel = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
};
