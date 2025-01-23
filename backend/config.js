import dotenv from 'dotenv';

dotenv.config();

export const publishKey = process.env.publishKey;
export const subscribeKey = process.env.subscribeKey;
export const secretKey = process.env.secretKey;
export const adminKey = process.env.adminKey;
export default {
  publishKey,
  subscribeKey,
  secretKey,
  adminKey,
};
