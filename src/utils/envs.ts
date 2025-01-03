import * as dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
  DB_NAME: string;
  PORT: string;
  CONFIGS_SERVICE_HOST: string;
  CONFIGS_SERVICE_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: string;
}

export const envs: EnvVars = {
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
  CONFIGS_SERVICE_HOST: process.env.CONFIGS_SERVICE_HOST,
  CONFIGS_SERVICE_PORT: process.env.CONFIGS_SERVICE_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
};
