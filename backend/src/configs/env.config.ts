import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

export const EnvConfiguration = {
  PORT: env.get('PORT').asPortNumber(),
  HOST: env.get('HOST').asString(),
  DB_HOST: env.get('DB_HOST').asString(),
  DB_PORT: env.get('DB_PORT').asPortNumber(),
  DB_USER: env.get('DB_USER').asString(),
  DB_NAME: env.get('DB_NAME').asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').asString(),
};
