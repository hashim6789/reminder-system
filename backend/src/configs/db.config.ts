import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostgreSQL] ✅ Connected to:', process.env.DATABASE_URL);
    } else {
      console.log('[PostgreSQL] ✅ Connected');
    }
  } catch (error) {
    console.error('[PostgreSQL] ❌ Connection error:', error);
    process.exit(1);
  }
};
