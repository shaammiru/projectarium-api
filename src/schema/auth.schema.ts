import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ message: "username must be a string" })
    .toLowerCase()
    .regex(/^[a-z0-9]+$/, { message: "username only accept letter and number" })
    .min(4, { message: "username must be at least 4 characters" }),
  fullname: z
    .string({ message: "fullname must be a string" })
    .min(1, { message: "fullname must be at least 1 character" }),
  password: z
    .string({ message: "password must be a string" })
    .min(8, { message: "password must be at least 8 characters" }),
});

export const loginSchema = z.object({
  username: z.string({ message: "username must be a string" }),
  password: z.string({ message: "password must be a string" }),
});
