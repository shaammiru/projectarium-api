import { timestamp } from "drizzle-orm/pg-core";

export const timestampModel = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};
