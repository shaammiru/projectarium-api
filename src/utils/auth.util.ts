import { Context, Hono } from "hono";
import { verify } from "hono/jwt";

export const checkToken = async (token: string, c: Context) => {
  const payload = await verify(token, Bun.env.JWT_SECRET!);
  return !!payload;
};
