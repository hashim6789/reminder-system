import dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

export const ENV = {
  PORT: parseInt(getEnvVariable('PORT'), 10),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  JWT_SECRET: getEnvVariable('JWT_SECRET'),
  NODE_ENV: getEnvVariable('NODE_ENV'),
  IS_PRODUCTION: getEnvVariable('NODE_ENV') === 'production',
  DOMAIN: getEnvVariable('DOMAIN'),
  FRONTEND_URL: getEnvVariable('FRONTEND_URL'),
};
