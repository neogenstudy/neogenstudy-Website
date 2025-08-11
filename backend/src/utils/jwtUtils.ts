import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../env' });

const resetAccessTokenSecret = process.env.RESET_ACCESS_TOKEN_SECRET!;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '7d' });
};

export const generateResetAccessToken = (userId: string) => {
  const resetAccessToken = jwt.sign({ userId }, resetAccessTokenSecret, {
    expiresIn: '15m',
  });
  return resetAccessToken;
};

export const verifyResetAccessToken = (resetAccessToken: string) => {
  return jwt.verify(resetAccessToken, resetAccessTokenSecret) as {
    userId: string;
  };
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};
