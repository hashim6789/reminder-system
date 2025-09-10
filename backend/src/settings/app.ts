import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ENV } from '@/configs';
import { apiRouter } from '@/routers';
import { apiRateLimiter, corsMiddleware, errorHandler } from '@/middlewares';

const app = express();

// Logging: Only enable in development
if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(corsMiddleware);
app.use(apiRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount API Routes
app.use('/api', apiRouter);

app.use(errorHandler);

export { app };
