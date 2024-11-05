import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password: string) => {
  const saltRound = process.env.SALT_ROUNDS || 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};

const generateToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "6h",
  });
  return token;
};

export default {
  hashPassword,
  comparePassword,
  generateToken,
};
