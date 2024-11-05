import { pgTable, uuid, varchar, text, date } from "drizzle-orm/pg-core";
import { timestampModel } from "../../utils/timestamp.util";
// import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().unique().notNull(),
  fullname: varchar().notNull(),
  birthdate: date().notNull(),
  bio: text(),
  ...timestampModel,
});

// export const usersRelations = relations(users, ({ many }) => ({
//   following: many(follows, { relationName: "following" }),
//   follower: many(follows, { relationName: "follower" }),
// }));

// export const follows = pgTable("follows", {
//   id: uuid().defaultRandom().primaryKey(),
//   userId: uuid().notNull(),
//   followerId: uuid().notNull(),
// });

// export const followsRelations = relations(follows, ({ one }) => ({
//   user: one(users, {
//     fields: [follows.userId],
//     references: [users.id],
//     relationName: "following",
//   }),
//   follower: one(users, {
//     fields: [follows.followerId],
//     references: [users.id],
//     relationName: "follower",
//   }),
// }));
