import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction): void {
  console.error(`[Error] ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });
}

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
