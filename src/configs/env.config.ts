import dotenv from 'dotenv';

dotenv.config();

const EnvConfiguration = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
};
