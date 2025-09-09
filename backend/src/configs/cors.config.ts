import { CorsOptions } from 'cors';
import { ENV } from './env.config';

/**
 * Get the list of allowed origins based on environment.
 */
const domain = ENV.DOMAIN;
const allowedOrigins: string[] =
  ENV.NODE_ENV === 'production' ? [`https://${domain}`] : [ENV.FRONTEND_URL, `http://${domain}`];

/**
 * CORS options used globally in the application.
 */
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // Needed for legacy browsers
};
